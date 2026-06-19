//package com.election.config;
//
//import com.election.model.Role;
//import com.election.model.User;
//import com.election.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//    
//    @Autowired
//    private UserRepository userRepository;
//    
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    
//    @Override
//    public void run(String... args) throws Exception {
//        // Create RO user if not exists
//        if (!userRepository.existsByUsername("rofficer")) {
//            User roUser = new User();
//            roUser.setUsername("rofficer");
//            roUser.setPassword(passwordEncoder.encode("password"));
//            roUser.setEmail("ro@election.gov.in");
//            roUser.setRole(Role.RO_RETURNING_OFFICER);
//            roUser.setVerified(true);
//            roUser.setCreatedAt(java.time.LocalDateTime.now());
//            roUser.setUpdatedAt(java.time.LocalDateTime.now());
//            userRepository.save(roUser);
//            System.out.println("✅✅✅ RO User 'rofficer' created successfully! Password: password");
//        } else {
//            System.out.println("✅ RO User already exists");
//        }
//        
//        // Print all users for debugging
//        System.out.println("📊 Current users in database:");
//        userRepository.findAll().forEach(user -> 
//            System.out.println(" - Username: " + user.getUsername() + ", Role: " + user.getRole() + ", Verified: " + user.isVerified())
//        );
//    }
//}