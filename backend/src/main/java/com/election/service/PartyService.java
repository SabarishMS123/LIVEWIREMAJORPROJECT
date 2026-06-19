// PartyService.java
package com.election.service;

import com.election.model.Party;
import com.election.model.User;
import com.election.model.Role;
import com.election.repository.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PartyService {
    
    @Autowired
    private PartyRepository partyRepository;
    
    @Autowired
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Party registerParty(Party party, String username, String password, String email) {
        // ✅ Create User account (this sends verification email)
        User user = authService.registerUser(username, password, email, Role.PARTY);
        
        // ✅ Link user to party
        party.setUser(user);
        party.setUsername(username);
        party.setPassword(passwordEncoder.encode(password));
        party.setEmail(email);
        
        return partyRepository.save(party);
    }
   
    
//    public Party updateParty(Long id, Party partyDetails) {
//        Party party = partyRepository.findById(id)
//            .orElseThrow(() -> new RuntimeException("Party not found"));
//        
//        party.setName(partyDetails.getName());
//        party.setAbbreviation(partyDetails.getAbbreviation());
//        party.setSymbol(partyDetails.getSymbol());
//        party.setHeadquarters(partyDetails.getHeadquarters());
//       // party.setLogoUrl(partyDetails.getLogoUrl());
//        
//        return partyRepository.save(party);
//    }
//    public Party getPartyByUser(Long userId) {
//        // Since Party doesn't have user_id, find by username from authentication
//        // This method should be changed or you need to pass username instead of user ID
//        throw new RuntimeException("Use getPartyByUsername instead");
//    }
    public Party getPartyByUsername(String username) {
        return partyRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Party not found for username: " + username));
    }
    public List<Party> getAllParties() {
        return partyRepository.findAll();
    }
    
    public Party getPartyById(Long id) {
        return partyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Party not found"));
    }
    
    public Party getPartyByUser(Long userId) {
        // You need to either add a findByUser method to PartyRepository or implement this differently
        // Let's add a query to PartyRepository first
        return partyRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Party not found for this user"));
    }
 // ✅ ADD THIS METHOD
    public Party findByUsername(String username) {
        return partyRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Party not found with username: " + username));
    }
    
    // ✅ ADD THIS METHOD (if not exists)
    public Party registerParty(Party party) {
        return partyRepository.save(party);
    }
    
    // ✅ ADD THIS METHOD (if not exists)
    public Party updateParty(Long id, Party partyDetails) {
        Party party = partyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Party not found"));
        party.setName(partyDetails.getName());
        party.setAbbreviation(partyDetails.getAbbreviation());
        party.setSymbol(partyDetails.getSymbol());
        party.setHeadquarters(partyDetails.getHeadquarters());
        return partyRepository.save(party);
    }
    
}