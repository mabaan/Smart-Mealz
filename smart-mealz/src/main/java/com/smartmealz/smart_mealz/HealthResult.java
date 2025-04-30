package com.smartmealz.smart_mealz;

import jakarta.persistence.*;

@Entity
public class HealthResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int age;
    private String gender;
    private double height;
    private double weight;
    private String activity;
    private String goal;

    private double bmr;
    private double calories;
    private double bmi;
    private String category;

    // Getters
    public Long getId() {
        return id;
    }

    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public double getHeight() {
        return height;
    }

    public double getWeight() {
        return weight;
    }

    public String getActivity() {
        return activity;
    }

    public String getGoal() {
        return goal;
    }

    public double getBmr() {
        return bmr;
    }

    public double getCalories() {
        return calories;
    }

    public double getBmi() {
        return bmi;
    }

    public String getCategory() {
        return category;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public void setBmr(double bmr) {
        this.bmr = bmr;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}