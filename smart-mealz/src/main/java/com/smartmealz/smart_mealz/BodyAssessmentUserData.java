package com.smartmealz.smart_mealz;

public class BodyAssessmentUserData {
    private int age;
    private String gender;
    private double height;
    private double weight;
    private String activity;
    private String goal;

    // Getters
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

    // Setters
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
}