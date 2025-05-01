package com.smartmealz.smart_mealz.repository;

import com.smartmealz.smart_mealz.model.MealOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MealRepository {

    @Autowired
    private DataSource dataSource;

    // Retrieve full details of all meal orders (name, price, quantity)
    public List<MealOrder> getAllMealOrders() throws SQLException {
        String sql = "SELECT o.order_id, o.meal_id, o.quantity, o.order_date, " +
        "m.name AS meal_name, m.price AS meal_price, m.image_url " +
        "FROM Orders o JOIN Meals m ON o.meal_id = m.id " +
        "ORDER BY o.order_date DESC";


        List<MealOrder> mealOrders = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                MealOrder mealOrder = new MealOrder(
                    rs.getInt("order_id"),
                    rs.getInt("meal_id"),
                    rs.getInt("quantity"),
                    rs.getTimestamp("order_date"),
                    rs.getString("meal_name"),
                    rs.getDouble("meal_price"),
                    rs.getString("image_url")
                );
                mealOrders.add(mealOrder);
            }
        }

        return mealOrders;
    }

    // Optional: Method to save orders directly (alternative to service logic)
    public void saveMealOrder(Integer mealId, Integer quantity) throws SQLException {
        String sql = "INSERT INTO Orders (meal_id, quantity) VALUES (?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, mealId);
            ps.setInt(2, quantity);
            ps.executeUpdate();
        }
    }
}
