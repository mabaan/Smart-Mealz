package com.smartmealz.smart_mealz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")            // http://localhost:8080/
    public String home() {      // <-- make *public*
        return "home";          // renders templates/home.html
    }

    @GetMapping("/body-assessment")     // http://localhost:8080/bodyassessment
    public String bodyAssessmentPage() {
        return "bodyassessment";        // renders templates/bodyassessment.html
    }

    @GetMapping("/selectplan")  // http://localhost:8080/selectplan
    public String selectPlan() {
        return "selectplan";    // renders templates/selectplan.html
    }

    @GetMapping("/checkout")    // http://localhost:8080/checkout
    public String checkout() {
        return "checkout";      // renders templates/checkout.html
    }
}
