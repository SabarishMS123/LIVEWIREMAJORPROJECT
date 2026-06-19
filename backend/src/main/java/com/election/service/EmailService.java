//// EmailService.java
//package com.election.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
////@Service
////public class EmailService {
////    
////    @Autowired
////    private JavaMailSender mailSender;
////    
////    public void sendVerificationEmail(String to, String token) {
////        SimpleMailMessage message = new SimpleMailMessage();
////        message.setTo(to);
////        message.setSubject("Email Verification - Election Management System");
////        message.setText("Please click the link to verify your account: " +
////                "http://localhost:8080/api/auth/verify?token=" + token);
////        mailSender.send(message);
////    }
////    
////    public void sendVoterCredentials(String to, String voterId, String username, String password) {
////        SimpleMailMessage message = new SimpleMailMessage();
////        message.setTo(to);
////        message.setSubject("Voter Registration - Election Management System");
////        message.setText("Dear Voter,\n\n" +
////                "Your account has been created successfully.\n\n" +
////                "Voter ID: " + voterId + "\n" +
////                "Username: " + username + "\n" +
////                "Password: " + password + "\n\n" +
////                "Please login and change your password after first login.\n\n" +
////                "Thank you.");
////        mailSender.send(message);
////    }
////}
//@Service
//public class EmailService {
//    
//    public void sendVerificationEmail(String to, String token) {
//        // Just log instead of actually sending
//        System.out.println("=========================================");
//        System.out.println("VERIFICATION EMAIL (would be sent to): " + to);
//        System.out.println("Verification link: http://localhost:9000/api/auth/verify?token=" + token);
//        System.out.println("=========================================");
//    }
//    
//    public void sendVoterCredentials(String email, String voterId, String username, String password) {
//        System.out.println("=========================================");
//        System.out.println("VOTER CREDENTIALS (would be sent to): " + email);
//        System.out.println("Voter ID: " + voterId);
//        System.out.println("Username: " + username);
//        System.out.println("Password: " + password);
//        System.out.println("=========================================");
//    }
//}
package com.election.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
//import jakarta.mail.MimeMessage;
import jakarta.mail.internet.MimeMessage;

//@Service
//public class EmailService {
//    
//    @Autowired(required=true)
//    private JavaMailSender mailSender;
//    
//    // Send plain text verification email
//    public void sendVerificationEmail(String to, String token) {
//        String verificationUrl = "http://localhost:9000/api/auth/verify?token=" + token;
//        
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Email Verification - Election Management System");
//        message.setText("Dear User,\n\n" +
//                        "Please click the link below to verify your email address:\n\n" +
//                        verificationUrl + "\n\n" +
//                        "This link will expire in 24 hours.\n\n" +
//                        "If you did not create an account, please ignore this email.\n\n" +
//                        "Thank you,\n" +
//                        "Election Commission");
//        
//        mailSender.send(message);
//        System.out.println("Verification email sent to: " + to);
//    }
//    
//    // Send HTML email (optional, more professional)
//    public void sendVerificationEmailHtml(String to, String token) {
//        try {
//            String verificationUrl = "http://localhost:9000/api/auth/verify?token=" + token;
//            
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//            
//            helper.setTo(to);
//            helper.setSubject("Email Verification - Election Management System");
//            
//            String htmlContent = """
//                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//                    <h2 style="color: #2c3e50;">Welcome to Election Management System</h2>
//                    <p>Dear User,</p>
//                    <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
//                    <a href="%s" style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
//                    <p>Or copy this link: <a href="%s">%s</a></p>
//                    <p>This link will expire in 24 hours.</p>
//                    <hr style="margin: 20px 0;">
//                    <p style="color: #7f8c8d; font-size: 12px;">If you did not create an account, please ignore this email.</p>
//                </div>
//                """.formatted(verificationUrl, verificationUrl, verificationUrl);
//            
//            helper.setText(htmlContent, true);
//            
//            mailSender.send(message);
//            System.out.println("HTML verification email sent to: " + to);
//        } catch (Exception e) {
//            System.err.println("Failed to send HTML email: " + e.getMessage());
//            // Fallback to plain text
//            sendVerificationEmail(to, token);
//        }
//    }
//    
//    public void sendVoterCredentials(String to, String voterId, String username, String password) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Voter Registration - Election Management System");
//        message.setText("Dear Voter,\n\n" +
//                        "Your account has been created successfully.\n\n" +
//                        "Your Credentials:\n" +
//                        "Voter ID: " + voterId + "\n" +
//                        "Username: " + username + "\n" +
//                        "Password: " + password + "\n\n" +
//                        "Please login and change your password after first login.\n\n" +
//                        "Thank you,\n" +
//                        "Election Commission");
//        
//        mailSender.send(message);
//        System.out.println("Voter credentials sent to: " + to);
//    }
//}
@Service
public class EmailService {
    
    @Autowired(required = false)
    private JavaMailSender mailSender;
    
//    public void sendVerificationEmail(String to, String token) {
//        String verificationUrl = "http://localhost:9000/api/auth/verify?token=" + token;
//        
//        // ✅ Force print regardless of mailSender
//        System.out.println("=========================================");
//        System.out.println("🔔 EMAIL VERIFICATION REQUESTED");
//        System.out.println("TO: " + to);
//        System.out.println("TOKEN: " + token);
//        System.out.println("LINK: " + verificationUrl);
//        System.out.println("=========================================");
//        
//        if (mailSender == null) {
//            System.err.println("❌ JavaMailSender is NULL! Email not configured properly.");
//            return;
//        }
//        
//        try {
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setTo(to);
//            message.setSubject("Email Verification - Election Management System");
//            message.setText("Dear User,\n\n" +
//                            "Please click the link below to verify your email address:\n\n" +
//                            verificationUrl + "\n\n" +
//                            "This link will expire in 24 hours.\n\n" +
//                            "Thank you,\n" +
//                            "Election Commission");
//            
//            mailSender.send(message);
//            System.out.println("✅ Email sent successfully to: " + to);
//        } catch (Exception e) {
//            System.err.println("❌ Failed to send email: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
    public void sendVerificationEmail(String to, String token) {
        String verificationUrl = "http://localhost:9000/api/auth/verify?token=" + token;
        
        System.out.println("=========================================");
        System.out.println("🔔 VERIFICATION EMAIL");
        System.out.println("TO: " + to);
        System.out.println("TOKEN: " + token);
        System.out.println("VERIFICATION LINK: " + verificationUrl);
        System.out.println("=========================================");
        
        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(to);
                message.setSubject("Verify Your Email - Election Management System");
                message.setText("Dear User,\n\nPlease click the link below to verify your email address:\n\n" + verificationUrl + "\n\nThank you.");
                mailSender.send(message);
                System.out.println("✅ Email sent successfully!");
            } catch (Exception e) {
                System.err.println("❌ Failed to send email: " + e.getMessage());
            }
        } else {
            System.out.println("⚠️ JavaMailSender not configured - email not sent");
        }
    }
}