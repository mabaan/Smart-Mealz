package com.smartmealz.smart_mealz;

import java.time.LocalDateTime;

public class BMILog {

    private Long id;
    private int age;
    private String gender;
    private double height;
    private double weight;
    private double bmi;
    private String category;
    private int recommendedCalories;
    private LocalDateTime timestamp = LocalDateTime.now();
    private Long userId;  // Just store user ID

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public double getHeight() {
        return height;
    }
    
    public void setHeight(double height) {
        this.height = height;
    }
    
    public double getWeight() {
        return weight;
    }
    
    public void setWeight(double weight) {
        this.weight = weight;
    }
    
    public double getBmi() {
        return bmi;
    }
    
    public void setBmi(double bmi) {
        this.bmi = bmi;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public int getRecommendedCalories() {
        return recommendedCalories;
    }
    
    public void setRecommendedCalories(int recommendedCalories) {
        this.recommendedCalories = recommendedCalories;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
