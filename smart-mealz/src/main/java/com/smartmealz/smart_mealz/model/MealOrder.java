package com.smartmealz.smart_mealz.model;

import java.sql.Timestamp;

public class MealOrder extends BaseMeal {
    
    private Integer orderId;
    private Integer mealId;
    private Integer quantity;
    private Timestamp orderDate;

    //NO NEED CUZ INHERITANCE
    // private String imageUrl;
    // private String mealName;
    // private Double mealPrice;

    public MealOrder() {
    }

    public MealOrder(Integer orderId, Integer mealId, Integer quantity, Timestamp orderDate, String name, Double price, String imageUrl
    ) {
        this.orderId = orderId;
        this.mealId = mealId;
        this.quantity = quantity;
        this.orderDate = orderDate;
        // this.mealName = mealName;
        // this.mealPrice = mealPrice;
        // this.imageUrl = imageUrl;

        // inherited fields
        setName(name);
        setPrice(price);
        setImageUrl(imageUrl);
    }

    // Getters and Setters
    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getMealId() {
        return mealId;
    }

    public void setMealId(Integer mealId) {
        this.mealId = mealId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    // public String getMealName() {
    //     return mealName;
    // }

    // public void setMealName(String mealName) {
    //     this.mealName = mealName;
    // }

    // public Double getMealPrice() {
    //     return mealPrice;
    // }

    // public void setMealPrice(Double mealPrice) {
    //     this.mealPrice = mealPrice;
    // }

    // public String getImageUrl() { return imageUrl; }
    // public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    @Override
    public String toString() {
        return "MealOrder{" +
                "orderId=" + orderId +
                ", mealId=" + mealId +
                ", quantity=" + quantity +
                ", orderDate=" + orderDate +
                ", mealName='" + getName() + '\'' +
                ", mealPrice=" + getPrice() +
                '}';
    }
}
