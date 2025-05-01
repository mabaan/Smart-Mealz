package com.smartmealz.smart_mealz.controller;

// import com.smartmealz.smart_mealz.User;
// import com.smartmealz.smart_mealz.BMILog;
// import com.smartmealz.smart_mealz.repository.BMILogRepository;
// import com.smartmealz.smart_mealz.repository.UserRepository;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import java.util.Map;
import org.springframework.ui.Model;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartmealz.smart_mealz.service.BmiService;


@RestController
public class BmiController {

    @Autowired
    private BmiService bmiService;

    @PostMapping("/submit-bmi")
    public String submitBmi(@RequestBody Map<String, String> payload,
                            @CookieValue(value = "user_id", defaultValue = "-1") String userId) {
    
        String bmi = payload.get("bmi");
        String height = payload.get("height");
        String weight = payload.get("weight");
        System.out.println("BMI submission received. BMI: " + bmi + ", Height: " + height + ", Weight: " + weight + ", User ID: " + userId);
    
        if (userId.equals("-1")) {
            return "User not logged in.";
        }
    
        bmiService.insertBmi(bmi, height, weight, userId);
    
        return "OK";
    }

    @GetMapping("/bmi-history")
    public String bmiHistory(@CookieValue(value = "user_id", defaultValue = "-1") String userId,
                             Model model) {
    
        if (userId.equals("-1")) {
            return "redirect:/?loginRequired";
        }
    
        List<Map<String, Object>> bmiLogs = bmiService.getUserBmiLogs(userId);
        model.addAttribute("bmiLogs", bmiLogs);
    
        return "/bodyassessment.html"; // whatever your Thymeleaf page is called
    }
    
    
}

