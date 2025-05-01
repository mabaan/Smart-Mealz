// package com.smartmealz.smart_mealz.controller;
// import org.springframework.ui.Model;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;

// @Controller
// public class PageController {

//     @GetMapping("/")            // http://localhost:8080/
//     public String home() {      // <-- make *public*
//         return "home";          // renders templates/home.html
//     }

//     @GetMapping("/selectplan")  // http://localhost:8080/selectplan
//     public String selectPlan() {
//         return "selectplan";    // renders templates/selectplan.html
//     }

//     // @GetMapping("/meals")
//     // public String showMeals(Model model) {
//     //     // You can later populate meals by category here
//     //     // For now, just return the view
//     //     return "meals"; // This looks for meals.html in /templates
//     // }

//     // @GetMapping("/checkout")    // http://localhost:8080/checkout
//     // public String checkout() {
//     //     return "checkout";      // renders templates/checkout.html
//     // }

  
    
//         @GetMapping("/bodyassessment")          // <-- URL user clicks
//         public String bodyassessment() {
//             return "bodyassessment";            // <-- templates/bodyassessment.html
//         }
    
// }
