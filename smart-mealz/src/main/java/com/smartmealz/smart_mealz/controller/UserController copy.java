//DELETE FILE
// package com.smartmealz.smart_mealz.controller;

// import com.smartmealz.smart_mealz.User;
// import com.smartmealz.smart_mealz.repository.UserRepository;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;

// @Controller
// public class UserController {

//     @Autowired
//     private UserRepository userRepository;

//     @PostMapping("/signup")
//     public String signup(@RequestParam String email,
//                          @RequestParam String password,
//                          HttpServletResponse response) {

//         if (userRepository.findByEmail(email) != null) {
//             // Email already exists
//             return "redirect:/?signupError";
//         }

//         User user = new User();
//         user.setEmail(email);
//         user.setPassword(password);
//         userRepository.save(user);

//         // Set cookie
//         Cookie cookie = new Cookie("userEmail", email);
//         cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//         cookie.setPath("/");
//         response.addCookie(cookie);

//         return "redirect:/"; // go back home after signup
//     }

//     @PostMapping("/login")
//     public String login(@RequestParam String email,
//                         @RequestParam String password,
//                         HttpServletResponse response) {

//         User user = userRepository.findByEmail(email);

//         if (user != null && user.getPassword().equals(password)) {
//             // Correct login
//             Cookie cookie = new Cookie("userEmail", email);
//             cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//             cookie.setPath("/");
//             response.addCookie(cookie);

//             return "redirect:/";
//         }

//         // Wrong email or password
//         return "redirect:/?loginError";
//     }
// }
