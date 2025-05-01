package com.smartmealz.smart_mealz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;



@Service
public class BmiService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertBmi(String bmi, String height, String weight, String user_id) {
        String sql = "INSERT INTO bmi_records (bmi, height, weight, user_id) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, bmi, height, weight, user_id);
    }
    public List<Map<String, Object>> getUserBmiLogs(String userId) {
        String sql = "SELECT bmi, height, weight FROM bmi_records WHERE user_id = ?";
        return jdbcTemplate.queryForList(sql, userId);
    }
    
    
}
