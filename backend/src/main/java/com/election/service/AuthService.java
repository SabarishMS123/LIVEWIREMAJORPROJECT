// AuthService.java
package com.election.service;

import com.election.model.User;
import com.election.model.Role;
import com.election.repository.UserRepository;
import com.election.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
    
    public Authentication authenticateUser(String username, String password) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }
    
    public User registerUser(String username, String password, String email, Role role) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username is already taken!");
        }
        
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already in use!");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole(role);
        user.setVerified(false);
        user.setVerificationToken(UUID.randomUUID().toString());
        
        User savedUser = userRepository.save(user);
        
        // ✅ This line MUST be present
        emailService.sendVerificationEmail(email, user.getVerificationToken());
        
        System.out.println("✅ Verification email sent to: " + email);
        System.out.println("✅ Verification token: " + user.getVerificationToken());
        
        return savedUser;
    }
    public boolean verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
            .orElseThrow(() -> new RuntimeException("Invalid verification token"));
        
        user.setVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);
        return true;
    }
}