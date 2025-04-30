package com.smartmealz.smart_mealz;

import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public double calculateBMR(BodyAssessmentUserData user) {
        if ("male".equalsIgnoreCase(user.getGender())) {
            return 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() + 5;
        } else {
            return 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() - 161;
        }
    }

    public double adjustForActivity(double bmr, String activity) {
        return switch (activity.toLowerCase()) {
            case "light" -> bmr * 1.375;
            case "moderate" -> bmr * 1.55;
            case "very active" -> bmr * 1.725;
            default -> bmr * 1.2;
        };
    }

    public double adjustForGoal(double calories, String goal) {
        return switch (goal.toLowerCase()) {
            case "gain" -> calories + 500;
            case "lose" -> calories - 500;
            default -> calories;
        };
    }

    public double calculateBMI(double weight, double heightCm) {
        double heightM = heightCm / 100;
        return weight / (heightM * heightM);
    }

    public String getBMICategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        else if (bmi < 24.9) return "Normal weight";
        else if (bmi < 29.9) return "Overweight";
        else return "Obese";
    }
}