package com.smartmealz.smart_mealz.controller;

import com.smartmealz.smart_mealz.service.BmiService;
import com.smartmealz.smart_mealz.service.MealService;
import com.smartmealz.smart_mealz.model.MealOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class PageController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private BmiService bmiService;

    @Autowired
    private MealService mealService;

    // ✅ 1️⃣ Home page
    @GetMapping("/")
    public String home(@CookieValue(value = "user_id", defaultValue = "-1") String userId,
                       Model model) {

        if (!userId.equals("-1")) {
            List<Map<String, Object>> bmiLogs = bmiService.getUserBmiLogs(userId);
            model.addAttribute("bmiLogs", bmiLogs);
        }

        return "home";
    }

    // ✅ 2️⃣ Meals page
    @GetMapping("/meals")
    public String showMeals(Model model) {

        // High-Protein Meals
        String sqlHigh = "SELECT * FROM Meals WHERE category = 'high-protein'";
        List<Map<String, Object>> highProteinMeals = jdbcTemplate.queryForList(sqlHigh);
        model.addAttribute("highProteinMeals", highProteinMeals);

        // Balanced Meals
        String sqlBalanced = "SELECT * FROM Meals WHERE category = 'balanced'";
        List<Map<String, Object>> balancedMeals = jdbcTemplate.queryForList(sqlBalanced);
        model.addAttribute("balancedMeals", balancedMeals);

        // Plant-Based Meals
        String sqlPlant = "SELECT * FROM Meals WHERE category = 'plant-based'";
        List<Map<String, Object>> plantBasedMeals = jdbcTemplate.queryForList(sqlPlant);
        model.addAttribute("plantBasedMeals", plantBasedMeals);

        // Desserts
        String sqlDesserts = "SELECT * FROM Meals WHERE category = 'desserts'";
        List<Map<String, Object>> dessertMeals = jdbcTemplate.queryForList(sqlDesserts);
        model.addAttribute("dessertMeals", dessertMeals);

        System.out.println("High-Protein: " + highProteinMeals.size());
        System.out.println("Balanced: " + balancedMeals.size());
        System.out.println("Plant-Based: " + plantBasedMeals.size());
        System.out.println("Desserts: " + dessertMeals.size());

        return "meals";
    }

    // ✅ 3️⃣ Submit selected meals
    @PostMapping("/submitMeals")
    public String submitMeals(@RequestParam("mealIds") List<Integer> mealIds,
                              @RequestParam("quantities") List<Integer> quantities) {

        try {
            mealService.processMealOrder(mealIds, quantities);
        } catch (SQLException e) {
            e.printStackTrace();
            return "redirect:/meals?error";
        }

        return "redirect:/checkout";
    }

    // ✅ 4️⃣ Checkout page with order summary
    @GetMapping("/checkout")
    public String checkout(Model model) {

        try {
            List<MealOrder> orderSummary = mealService.getOrderSummary();
            model.addAttribute("orders", orderSummary);

            // Calculate subtotal
            double subtotal = 0.0;
            for (MealOrder order : orderSummary) {
                subtotal += order.getPrice() * order.getQuantity();
            }
            model.addAttribute("subtotal", subtotal);

        } catch (SQLException e) {
            e.printStackTrace();
            model.addAttribute("orders", new ArrayList<MealOrder>());
            model.addAttribute("subtotal", 0.0);
        }

        return "checkout";
    }
}
