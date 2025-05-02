// package com.smartmealz.smart_mealz.controller;

// import com.smartmealz.smart_mealz.User;
// import com.smartmealz.smart_mealz.repository.UserRepository;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CookieValue;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;


// import java.security.MessageDigest;
// import java.security.NoSuchAlgorithmException;

// import org.springframework.transaction.annotation.Transactional;



// @Controller
// public class UserController {
//     @Autowired
//     private JdbcTemplate jdbcTemplate;


//     @Autowired
//     private UserRepository userRepository;

//     private String hashPasswordMD5(String password) {
//         try {
//             MessageDigest md = MessageDigest.getInstance("MD5");
//             byte[] hashInBytes = md.digest(password.getBytes());
            
//             // Convert bytes to hex format
//             StringBuilder sb = new StringBuilder();
//             for (byte b : hashInBytes) {
//                 sb.append(String.format("%02x", b));
//             }
//             return sb.toString();
//         } catch (NoSuchAlgorithmException e) {
//             throw new RuntimeException(e);
//         }
//     }

//     // @PostMapping("/signup")
//     // public String signup(@RequestParam String email,
//     //                      @RequestParam String password,
//     //                      HttpServletResponse response) {

//     //     if (userRepository.findByEmail(email) != null) {
//     //         // Email already exists
//     //         return "redirect:/?signupError";
//     //     }

//     //     User user = new User();
//     //     user.setEmail(email);
//     //     user.setPassword(hashPasswordMD5(password));
//     //     userRepository.save(user);

//     //     // Set cookie
//     //     Cookie cookie = new Cookie("userEmail", email);
//     //     cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//     //     cookie.setPath("/");
//     //     response.addCookie(cookie);

//     //     return "redirect:/"; // go back home after signup
//     // }


//     @PostMapping("/signup")
//     public String signup(@RequestParam String email,
//                          @RequestParam String password,
//                          HttpServletResponse response) {
    
//         if (userRepository.findByEmail(email) != null) {
//             return "redirect:/?signupError";
//         }
    
//         User user = new User();
//         user.setEmail(email);
//         user.setPassword(hashPasswordMD5(password));
//         userRepository.save(user);
    
//         Cookie cookieEmail = new Cookie("userEmail", email);
//         cookieEmail.setMaxAge(7 * 24 * 60 * 60);
//         cookieEmail.setPath("/");
//         response.addCookie(cookieEmail);
    
//         Cookie cookieId = new Cookie("user_id", String.valueOf(user.getId()));
//         cookieId.setMaxAge(7 * 24 * 60 * 60);
//         cookieId.setPath("/");
//         response.addCookie(cookieId);
    
//         return "redirect:/";
//     }
       

//     // @PostMapping("/login")
//     // public String login(@RequestParam String email,
//     //                     @RequestParam String password,
//     //                     HttpServletResponse response) {

//     //     User user = userRepository.findByEmail(email);

//     //     if (user != null && user.getPassword().equals(hashPasswordMD5(password))) {
//     //         // Correct login
//     //         Cookie cookie = new Cookie("userEmail", email);
//     //         cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//     //         cookie.setPath("/");
//     //         response.addCookie(cookie);

//     //         return "redirect:/";
//     //     }

//     //     // Wrong email or password
//     //     return "redirect:/?loginError";
//     // }
//     // @GetMapping("/logout")
//     // public String logout(HttpServletResponse response) {
//     //     Cookie cookie = new Cookie("userEmail", "");
//     //     cookie.setMaxAge(0); // delete
//     //     cookie.setPath("/");
//     //     response.addCookie(cookie);
//     //     return "redirect:/";
//     // }
//     @PostMapping("/login")
//     public String login(@RequestParam String email,
//                         @RequestParam String password,
//                         HttpServletResponse response) {
    
//         User user = userRepository.findByEmail(email);
    
//         if (user != null && user.getPassword().equals(hashPasswordMD5(password))) {
//             Cookie cookieEmail = new Cookie("userEmail", email);
//             cookieEmail.setMaxAge(7 * 24 * 60 * 60);
//             cookieEmail.setPath("/");
//             response.addCookie(cookieEmail);
    
//             Cookie cookieId = new Cookie("user_id", String.valueOf(user.getId()));
//             cookieId.setMaxAge(7 * 24 * 60 * 60);
//             cookieId.setPath("/");
//             response.addCookie(cookieId);
    
//             return "redirect:/";
//         }
    
//         return "redirect:/?loginError";
//     }
    


//     // @PostMapping("/delete-account")
//     // @Transactional 
//     // public String deleteAccount(@CookieValue(value = "userEmail", defaultValue = "") String email,
//     //                             HttpServletResponse response) {
//     //     if (!email.isEmpty()) {
//     //         userRepository.deleteByEmail(email);
//     //     }
    
//     //     // Clear cookie
//     //     Cookie cookie = new Cookie("userEmail", "");
//     //     cookie.setMaxAge(0);
//     //     cookie.setPath("/");
//     //     response.addCookie(cookie);
    
//     //     return "redirect:/";
//     // }

//     // @PostMapping("/delete-account")
//     // @Transactional 
//     // public String deleteAccount(@CookieValue(value = "userEmail", defaultValue = "") String email,
//     //                             HttpServletResponse response) {
//     //     if (!email.isEmpty()) {
//     //         userRepository.deleteByEmail(email);
//     //     }
    
//     //     // Clear both cookies
//     //     Cookie cookieEmail = new Cookie("userEmail", "");
//     //     cookieEmail.setMaxAge(0);
//     //     cookieEmail.setPath("/");
//     //     response.addCookie(cookieEmail);
    
//     //     Cookie cookieId = new Cookie("user_id", "");
//     //     cookieId.setMaxAge(0);
//     //     cookieId.setPath("/");
//     //     response.addCookie(cookieId);
    
//     //     return "redirect:/";
//     // }

//     @PostMapping("/delete-account")
//     @Transactional 
//     public String deleteAccount(@CookieValue(value = "userEmail", defaultValue = "") String email,
//                                 HttpServletResponse response) {
//         if (!email.isEmpty()) {
    
//             // ✅ Find the user first
//             User user = userRepository.findByEmail(email);
    
//             if (user != null) {
//                 Long userId = user.getId();
    
//                 // ✅ Delete BMI records for this user
//                 String sql = "DELETE FROM bmi_records WHERE user_id = ?";
//                 jdbcTemplate.update(sql, userId);
    
//                 // ✅ Now delete the user
//                 userRepository.deleteByEmail(email);
//             }
//         }
    
//         // Clear cookies
//         Cookie cookieEmail = new Cookie("userEmail", "");
//         cookieEmail.setMaxAge(0);
//         cookieEmail.setPath("/");
//         response.addCookie(cookieEmail);
    
//         Cookie cookieId = new Cookie("user_id", "");
//         cookieId.setMaxAge(0);
//         cookieId.setPath("/");
//         response.addCookie(cookieId);
    
//         return "redirect:/";
//     }
    
    

//     @GetMapping("/logout")
//     public String logout(HttpServletResponse response) {
//         Cookie cookieEmail = new Cookie("userEmail", "");
//         cookieEmail.setMaxAge(0); // delete
//         cookieEmail.setPath("/");
//         response.addCookie(cookieEmail);
    
//         // ✅ Also delete user_id cookie
//         Cookie cookieId = new Cookie("user_id", "");
//         cookieId.setMaxAge(0); // delete
//         cookieId.setPath("/");
//         response.addCookie(cookieId);
    
//         return "redirect:/";
//     }
    
    

    


    
// }


package com.smartmealz.smart_mealz.controller;

import com.smartmealz.smart_mealz.User;
import com.smartmealz.smart_mealz.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.transaction.annotation.Transactional;



@Controller
public class UserController {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Autowired
    private UserRepository userRepository;

    private String hashPasswordMD5(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashInBytes = md.digest(password.getBytes());
            
            // Convert bytes to hex format
            StringBuilder sb = new StringBuilder();
            for (byte b : hashInBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String email,
                         @RequestParam String password,
                         HttpServletResponse response) {
    
        if (userRepository.findByEmail(email) != null) {
            return "redirect:/?signupError";
        }
    
        User user = new User();
        user.setEmail(email);
        user.setPassword(hashPasswordMD5(password));
        userRepository.save(user);
    
        Cookie cookieEmail = new Cookie("userEmail", email);
        cookieEmail.setMaxAge(7 * 24 * 60 * 60);
        cookieEmail.setPath("/");
        response.addCookie(cookieEmail);
    
        Cookie cookieId = new Cookie("user_id", String.valueOf(user.getId()));
        cookieId.setMaxAge(7 * 24 * 60 * 60);
        cookieId.setPath("/");
        response.addCookie(cookieId);
    
        return "redirect:/";
    }
       
    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpServletResponse response) {
    
        User user = userRepository.findByEmail(email);
    
        if (user != null && user.getPassword().equals(hashPasswordMD5(password))) {
            Cookie cookieEmail = new Cookie("userEmail", email);
            cookieEmail.setMaxAge(7 * 24 * 60 * 60);
            cookieEmail.setPath("/");
            response.addCookie(cookieEmail);
    
            Cookie cookieId = new Cookie("user_id", String.valueOf(user.getId()));
            cookieId.setMaxAge(7 * 24 * 60 * 60);
            cookieId.setPath("/");
            response.addCookie(cookieId);
    
            return "redirect:/";
        }
    
        return "redirect:/?loginError";
    }
   
    @PostMapping("/delete-account")
    @Transactional 
    public String deleteAccount(@CookieValue(value = "userEmail", defaultValue = "") String email,
                                HttpServletResponse response) {
        if (!email.isEmpty()) {
    
            // ✅ Find the user first
            User user = userRepository.findByEmail(email);
    
            if (user != null) {
                Long userId = user.getId();
    
                // ✅ Delete BMI records for this user
                String sql = "DELETE FROM bmi_records WHERE user_id = ?";
                jdbcTemplate.update(sql, userId);
    
                // ✅ Now delete the user
                userRepository.deleteByEmail(email);
            }
        }
    
        // Clear cookies
        Cookie cookieEmail = new Cookie("userEmail", "");
        cookieEmail.setMaxAge(0);
        cookieEmail.setPath("/");
        response.addCookie(cookieEmail);
    
        Cookie cookieId = new Cookie("user_id", "");
        cookieId.setMaxAge(0);
        cookieId.setPath("/");
        response.addCookie(cookieId);
    
        return "redirect:/";
    }
    
    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        Cookie cookieEmail = new Cookie("userEmail", "");
        cookieEmail.setMaxAge(0); // delete
        cookieEmail.setPath("/");
        response.addCookie(cookieEmail);
    
        // ✅ Also delete user_id cookie
        Cookie cookieId = new Cookie("user_id", "");
        cookieId.setMaxAge(0); // delete
        cookieId.setPath("/");
        response.addCookie(cookieId);
    
        return "redirect:/";
    }

}
