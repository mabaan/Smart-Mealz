package com.smartmealz.smart_mealz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import com.smartmealz.smart_mealz.BodyAssessmentUserData;
import com.smartmealz.smart_mealz.HealthResult;
import com.smartmealz.smart_mealz.HealthService;
import com.smartmealz.smart_mealz.repository.HealthResultRepository;

@Controller
public class HealthController {

    @Autowired
    private HealthService healthService;

    @Autowired
    private HealthResultRepository repository;

    @PostMapping("/calculate")
    public String calculate(@ModelAttribute BodyAssessmentUserData userData, Model model) {
        double bmr = healthService.calculateBMR(userData);
        double adjustedCalories = healthService.adjustForActivity(bmr, userData.getActivity());
        double goalCalories = healthService.adjustForGoal(adjustedCalories, userData.getGoal());
        double bmi = healthService.calculateBMI(userData.getWeight(), userData.getHeight());
        String category = healthService.getBMICategory(bmi);

        model.addAttribute("bmr", Math.round(bmr));
        model.addAttribute("calories", Math.round(goalCalories));
        model.addAttribute("bmi", Math.round(bmi * 10.0) / 10.0);
        model.addAttribute("category", category);

        HealthResult result = new HealthResult();
        result.setAge(userData.getAge());
        result.setGender(userData.getGender());
        result.setHeight(userData.getHeight());
        result.setWeight(userData.getWeight());
        result.setActivity(userData.getActivity());
        result.setGoal(userData.getGoal());
        result.setBmr(Math.round(bmr));
        result.setCalories(Math.round(goalCalories));
        result.setBmi(Math.round(bmi * 10.0) / 10.0);
        result.setCategory(category);

        repository.save(result); // Save to MySQL

        return "result";
    }
}