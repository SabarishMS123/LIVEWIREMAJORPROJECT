// PartyController.java
package com.election.controller;

import com.election.dto.CandidateRequest;
import com.election.dto.ElectionResponseDTO;
import com.election.dto.PartyRequest;
import com.election.dto.PartyResponseDTO;
import com.election.model.Candidate;
import com.election.model.Election;
import com.election.model.ElectionResult;
import com.election.model.Party;
import com.election.security.CustomUserDetails;
import com.election.service.CandidateService;
import com.election.service.ElectionService;
import com.election.service.PartyService;
import com.election.service.ResultService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/party")
@CrossOrigin(origins = "http://localhost:5173")
public class PartyController {
    
    @Autowired
    private PartyService partyService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private CandidateService candidateService;
    
    @Autowired
    private ResultService resultService;
    
    @Autowired
    private ElectionService electionService;
    
    
    @PostMapping("/register")
    public ResponseEntity<?> registerParty(@Valid @RequestBody PartyRequest partyRequest) {
        
        // ✅ Debug logging
        System.out.println("=== REGISTER PARTY REQUEST ===");
        System.out.println("Name: " + partyRequest.getName());
        System.out.println("Username: " + partyRequest.getUsername());
        System.out.println("Password: " + partyRequest.getPassword());
        System.out.println("Email: " + partyRequest.getEmail());
        
        // ✅ Check if password is null
        if (partyRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Password cannot be null");
        }
        
        if (partyRequest.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be empty");
        }
        
        Party party = new Party();
        party.setName(partyRequest.getName());
        party.setAbbreviation(partyRequest.getAbbreviation());
        party.setSymbol(partyRequest.getSymbol());
        party.setHeadquarters(partyRequest.getHeadquarters());
        
        // ✅ FIXED: Call the correct method that creates User and sends email
        Party registeredParty = partyService.registerParty(
            party,
            partyRequest.getUsername(),
            partyRequest.getPassword(),
            partyRequest.getEmail()
        );
        
        PartyResponseDTO response = new PartyResponseDTO(registeredParty);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    //pending to check
    
    @PutMapping("/update")
    public ResponseEntity<?> updateParty(
            @Valid @RequestBody PartyRequest partyRequest,
            Authentication auth) {

        CustomUserDetails userDetails =
                (CustomUserDetails) auth.getPrincipal();

        Party party =
                partyService.getPartyByUser(userDetails.getId());

        party.setName(partyRequest.getName());
        party.setAbbreviation(partyRequest.getAbbreviation());
        party.setSymbol(partyRequest.getSymbol());
        party.setHeadquarters(partyRequest.getHeadquarters());

        return ResponseEntity.ok(
                partyService.updateParty(party.getId(), party));
    }
    
    @PostMapping("/candidates")
    public ResponseEntity<?> addCandidate(@Valid @RequestBody CandidateRequest candidateRequest, Authentication auth) {
        
        // ✅ Get the logged-in party from authentication (NOT from request)
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Party party = partyService.getPartyByUsername(userDetails.getUsername());
        
        if (party == null) {
            return ResponseEntity.badRequest().body("Party not found for this user");
        }
        
        Candidate candidate = new Candidate();
        candidate.setName(candidateRequest.getName());
        candidate.setFatherName(candidateRequest.getFatherName());
        candidate.setMotherName(candidateRequest.getMotherName());
        candidate.setDateOfBirth(candidateRequest.getDateOfBirth());
        candidate.setAddress(candidateRequest.getAddress());
        candidate.setDocumentUrl(candidateRequest.getDocumentUrl());
        
        // ✅ Use party ID from authentication, ignore the one from request
        Candidate savedCandidate = candidateService.addCandidate(
            candidate,
            party.getId(),  // ← Use authenticated party's ID
            candidateRequest.getConstituencyId(),
            candidateRequest.getUsername(),
            candidateRequest.getPassword(),
            candidateRequest.getEmail()
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCandidate);
    }
    
    @GetMapping("/candidates")
    public ResponseEntity<?> getPartyCandidates(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        
        // ✅ FIXED: Get party by username instead of user ID
        Party party = partyService.getPartyByUsername(userDetails.getUsername());
        
        return ResponseEntity.ok(candidateService.getCandidatesByParty(party.getId()));
    }
    
    @GetMapping("/results")
    public ResponseEntity<?> viewResults(@RequestParam Long electionId) {
        return ResponseEntity.ok(resultService.getElectionResults(electionId));
    }
    @GetMapping("/elections")
    public ResponseEntity<?> getAllElections() {
        List<Election> elections = electionService.getAllElections();
        // Only return necessary fields, not full election details
        List<ElectionResponseDTO> response = elections.stream()
            .map(election -> new ElectionResponseDTO(election))
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/elections/completed")
    public ResponseEntity<?> getCompletedElections() {
        List<Election> elections = electionService.getCompletedElections();
        List<ElectionResponseDTO> response = elections.stream()
            .map(election -> new ElectionResponseDTO(election))
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    } 
    @GetMapping("/elections/{id}/results")
    public ResponseEntity<?> getElectionResults(@PathVariable Long id) {
        List<ElectionResult> results = resultService.getElectionResults(id);
        return ResponseEntity.ok(results);
    }
    
    // ✅ NEW: Get winner by election ID
   
    @GetMapping("/elections/{id}/winner")
    public ResponseEntity<?> getWinner(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getWinningCandidate(id));
    }
}