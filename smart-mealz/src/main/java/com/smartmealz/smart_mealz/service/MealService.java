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

    // ✅ 1️⃣ Clear previous orders + insert new orders
    public void processMealOrder(List<Integer> mealIds, List<Integer> quantities) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

            // ✅ Clear previous orders
            String deleteSql = "DELETE FROM Orders";
            try (PreparedStatement deleteStmt = conn.prepareStatement(deleteSql)) {
                deleteStmt.executeUpdate();
            }

            // ✅ Insert new orders
            String insertSql = "INSERT INTO Orders (meal_id, quantity) VALUES (?, ?)";
            try (PreparedStatement ps = conn.prepareStatement(insertSql)) {
                for (int i = 0; i < mealIds.size(); i++) {
                    int qty = quantities.get(i);
                    if (qty > 0) {
                        ps.setInt(1, mealIds.get(i));
                        ps.setInt(2, qty);
                        ps.executeUpdate();
                    }
                }
            }
        }
    }

    // ✅ 2️⃣ Retrieve order summary for checkout
    public List<MealOrder> getOrderSummary() throws SQLException {

        List<MealOrder> orderSummaries = new ArrayList<>();

        String sql = "SELECT o.order_id, o.meal_id, o.quantity, o.order_date, " +
                     "m.name AS meal_name, m.price AS meal_price, m.image_url " +
                     "FROM Orders o " +
                     "JOIN Meals m ON o.meal_id = m.id " +
                     "ORDER BY o.order_date DESC";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

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

        return orderSummaries;
    }
}
