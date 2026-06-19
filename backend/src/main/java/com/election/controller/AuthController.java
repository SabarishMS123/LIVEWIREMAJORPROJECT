// AuthController.java
package com.election.controller;

import com.election.dto.LoginRequest;
import com.election.dto.LoginResponse;
import com.election.security.CustomUserDetails;
import com.election.security.JwtTokenProvider;
import com.election.service.AuthService;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private org.springframework.context.ApplicationContext applicationContext;
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(
//            @Valid @RequestBody LoginRequest loginRequest) {
//
//        Authentication authentication =
//                authService.authenticateUser(
//                        loginRequest.getUsername(),
//                        loginRequest.getPassword());
//
//        String token = jwtTokenProvider.generateToken(authentication);
//
//        CustomUserDetails userDetails =
//                (CustomUserDetails) authentication.getPrincipal();
//
//        // ✅ Get role from token or authorities
//        String roleFromAuth = userDetails.getAuthorities().iterator().next().getAuthority();
//        // This will be "ROLE_RO_RETURNED_OFFICER"
//
//        LoginResponse response = new LoginResponse(
//                token,
//                userDetails.getId(),
//                userDetails.getUsername(),
//                userDetails.getEmail(),
//                roleFromAuth  // ← Use authority role instead of database role
//        );
//
//        return ResponseEntity.ok(response);
//    }
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authService.authenticateUser(
            loginRequest.getUsername(),
            loginRequest.getPassword()
        );
        
        String token = jwtTokenProvider.generateToken(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        // ✅ What is being set as role here?
        String roleFromAuth = userDetails.getAuthorities().iterator().next().getAuthority();
        // This returns "ROLE_CANDIDATE" not "CANDIDATE"!
        
        LoginResponse response = new LoginResponse(
            token,
            userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            roleFromAuth  // ← This is "ROLE_CANDIDATE"
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok("Email verified successfully");
    }
    
    @GetMapping("/test-email-config")
    public ResponseEntity<?> testEmailConfig() {
        Map<String, Object> result = new HashMap<>();
        
        // Check if mailSender bean exists
        try {
            JavaMailSender mailSender = applicationContext.getBean(JavaMailSender.class);
            result.put("mailSenderExists", true);
            result.put("mailSenderClass", mailSender.getClass().getName());
        } catch (Exception e) {
            result.put("mailSenderExists", false);
            result.put("mailSenderError", e.getMessage());
        }
        
        // Try to send a test email
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("mssabarish16@gmail.com");
            message.setSubject("Test Email from EMS");
            message.setText("This is a test email to verify SMTP configuration.");
            
            JavaMailSender mailSender = applicationContext.getBean(JavaMailSender.class);
            mailSender.send(message);
            result.put("testEmailSent", true);
        } catch (Exception e) {
            result.put("testEmailSent", false);
            result.put("testEmailError", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
}