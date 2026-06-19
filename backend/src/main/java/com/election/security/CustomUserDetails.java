package com.election.security;

import com.election.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    
    private final Long id;
    private final String username;
    private final String password;
    private final String email;
    private final String role;
    private final boolean verified;
    private final Collection<? extends GrantedAuthority> authorities;
    
    public CustomUserDetails(Long id, String username, String password, String email, 
                              String role, boolean verified, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.verified = verified;
        this.authorities = authorities;
    }
    
    public static CustomUserDetails build(User user) {
        // ✅ Ensure correct authority format
        String authority = "ROLE_" + user.getRole().name();
        System.out.println("Building CustomUserDetails for: " + user.getUsername());
        System.out.println("Role from DB: " + user.getRole().name());
        System.out.println("Authority created: " + authority);
        
        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority(authority)
        );
        
        return new CustomUserDetails(
            user.getId(),
            user.getUsername(),
            user.getPassword(),
            user.getEmail(),
            user.getRole().name(),
            user.isVerified(),
            authorities
        );
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return verified;  // ✅ Only return true if email is verified
    }
    
    public Long getId() {
        return id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getRole() {
        return role;
    }
}