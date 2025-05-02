package com.smartmealz.smart_mealz.controller;

import com.smartmealz.smart_mealz.service.MealService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;

import javax.sql.DataSource;
import java.sql.*;

@Controller
public class MealController {

    @Autowired
    private DataSource dataSource;

    @PostMapping("/placeOrder")
    public String placeOrder(@CookieValue(value = "user_id", defaultValue = "-1") Long userId) {

        System.out.println("Place order triggered for user ID: " + userId);
        if (userId == -1) {
            // Not logged in, redirect back to home or login
            return "redirect:/?notLoggedIn";
        }

        try (Connection conn = dataSource.getConnection()) {

            String sql = "UPDATE user_orders SET status = 'completed' WHERE user_id = ? AND status = 'draft'";
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, userId);
                ps.executeUpdate();
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return "redirect:/checkout?error";
        }

        return "redirect:/checkout?success";


    }
}
