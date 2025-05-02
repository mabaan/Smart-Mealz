package com.smartmealz.smart_mealz.service;

import com.smartmealz.smart_mealz.model.MealOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {

    @Autowired
    private DataSource dataSource;

    // Save meal order for a user
    public void processMealOrder(List<Integer> mealIds, List<Integer> quantities, Long userId) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {
    
            // Check for existing DRAFT order
            String checkOrderSql = "SELECT order_id FROM user_orders WHERE user_id = ? AND status = 'draft' LIMIT 1";
            Integer orderId = null;
    
            try (PreparedStatement ps = conn.prepareStatement(checkOrderSql)) {
                ps.setLong(1, userId);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    orderId = rs.getInt("order_id");
                }
            }
    
            // ✅ Step 2: If no draft, create new order
            if (orderId == null) {
                String insertUserOrderSql = "INSERT INTO user_orders (user_id, status) VALUES (?, 'draft')";
                try (PreparedStatement ps = conn.prepareStatement(insertUserOrderSql, Statement.RETURN_GENERATED_KEYS)) {
                    ps.setLong(1, userId);
                    ps.executeUpdate();
                    ResultSet rs = ps.getGeneratedKeys();
                    if (rs.next()) {
                        orderId = rs.getInt(1);
                    } else {
                        throw new SQLException("Failed to create new draft order.");
                    }
                }
            }
    
            // ✅ Step 3: Update meals in the draft order
            for (int i = 0; i < mealIds.size(); i++) {
                int mealId = mealIds.get(i);
                int qty = quantities.get(i);
    
                // Check if this meal already exists in the order
                String checkMealSql = "SELECT quantity FROM Orders WHERE order_id = ? AND meal_id = ?";
                Integer existingQty = null;
    
                try (PreparedStatement ps = conn.prepareStatement(checkMealSql)) {
                    ps.setInt(1, orderId);
                    ps.setInt(2, mealId);
                    ResultSet rs = ps.executeQuery();
                    if (rs.next()) {
                        existingQty = rs.getInt("quantity");
                    }
                }
    
                if (qty > 0) {
                    if (existingQty == null) {
                        // Insert new meal
                        String insertOrderSql = "INSERT INTO Orders (order_id, meal_id, quantity) VALUES (?, ?, ?)";
                        try (PreparedStatement ps = conn.prepareStatement(insertOrderSql)) {
                            ps.setInt(1, orderId);
                            ps.setInt(2, mealId);
                            ps.setInt(3, qty);
                            ps.executeUpdate();
                        }
                    } else {
                        // Update existing meal
                        String updateOrderSql = "UPDATE Orders SET quantity = ? WHERE order_id = ? AND meal_id = ?";
                        try (PreparedStatement ps = conn.prepareStatement(updateOrderSql)) {
                            ps.setInt(1, qty);
                            ps.setInt(2, orderId);
                            ps.setInt(3, mealId);
                            ps.executeUpdate();
                        }
                    }
                } else {
                    // If qty is 0 and meal exists, remove it
                    if (existingQty != null) {
                        String deleteOrderSql = "DELETE FROM Orders WHERE order_id = ? AND meal_id = ?";
                        try (PreparedStatement ps = conn.prepareStatement(deleteOrderSql)) {
                            ps.setInt(1, orderId);
                            ps.setInt(2, mealId);
                            ps.executeUpdate();
                        }
                    }
                }
            }
        }
    }
    

    // ✅ 2️⃣ Retrieve all orders for a user
    public List<MealOrder> getOrderSummary(Long userId) throws SQLException {

        List<MealOrder> orderSummaries = new ArrayList<>();
    
        String sql =
            "SELECT o.order_entry_id, o.order_id, o.meal_id, o.quantity, o.order_date, " +
            "m.name AS meal_name, m.price AS meal_price, m.image_url " +
            "FROM Orders o " +
            "JOIN Meals m ON o.meal_id = m.id " +
            "JOIN user_orders uo ON o.order_id = uo.order_id " +
            "WHERE uo.user_id = ? " +
            "AND uo.status = 'draft' " +
            "AND o.order_id = ( " +
            "    SELECT MAX(order_id) FROM user_orders WHERE user_id = ? AND status = 'draft' " +
            ") " +
            "ORDER BY o.order_date DESC";
    
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
    
            ps.setLong(1, userId); // First ? (user_id)
            ps.setLong(2, userId); // Second ? (subquery user_id)
    
            try (ResultSet rs = ps.executeQuery()) {
    
                while (rs.next()) {
                    MealOrder order = new MealOrder(
                            rs.getInt("order_id"),
                            rs.getInt("meal_id"),
                            rs.getInt("quantity"),
                            rs.getTimestamp("order_date"),
                            rs.getString("meal_name"),
                            rs.getDouble("meal_price"),
                            rs.getString("image_url")
                    );
                    orderSummaries.add(order);
                }
            }
        }
    
        return orderSummaries;
    }

    public List<MealOrder> getCompletedOrders(Long userId) throws SQLException {

        List<MealOrder> orderSummaries = new ArrayList<>();
    
        String sql = "SELECT o.order_id, o.meal_id, o.quantity, o.order_date, " +
                     "m.name AS meal_name, m.price AS meal_price, m.image_url " +
                     "FROM Orders o " +
                     "JOIN Meals m ON o.meal_id = m.id " +
                     "JOIN user_orders uo ON o.order_id = uo.order_id " +
                     "WHERE uo.user_id = ? " +
                     "AND uo.status = 'completed' " +
                     "ORDER BY o.order_date DESC";
    
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
    
            ps.setLong(1, userId);
    
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    MealOrder order = new MealOrder(
                        rs.getInt("order_id"),
                        rs.getInt("meal_id"),
                        rs.getInt("quantity"),
                        rs.getTimestamp("order_date"),
                        rs.getString("meal_name"),
                        rs.getDouble("meal_price"),
                        rs.getString("image_url")
                    );
                    orderSummaries.add(order);
                }
            }
        }
    
        return orderSummaries;
    }
    
    
    
}
