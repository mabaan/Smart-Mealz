package com.smartmealz.smart_mealz.repository;

import com.smartmealz.smart_mealz.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
