// CustomUserDetailsService.java - Complete working version
package com.election.security;

import com.election.model.Party;
import com.election.model.User;
import com.election.model.Role;
import com.election.repository.PartyRepository;
import com.election.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PartyRepository partyRepository;
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // First try users table
        User user = userRepository.findByUsername(username).orElse(null);
        
        if (user != null) {
            return CustomUserDetails.build(user);
        }
        
        // Then try parties table
        Party party = partyRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        
        // Create a User object from Party for authentication
        User partyUser = new User();
        partyUser.setId(party.getId());
        partyUser.setUsername(party.getUsername());
        partyUser.setPassword(party.getPassword());
        partyUser.setEmail(party.getEmail());
        partyUser.setRole(Role.PARTY);
        partyUser.setVerified(true);
        
        return CustomUserDetails.build(partyUser);
    }
    
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        
        return CustomUserDetails.build(user);
    }
}