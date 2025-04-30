package com.smartmealz.smart_mealz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmealz.smart_mealz.HealthResult;

public interface HealthResultRepository extends JpaRepository<HealthResult, Long> {
    
}