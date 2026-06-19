// CandidateController.java
package com.election.controller;

import com.election.dto.ElectionResponseDTO;
import com.election.dto.NominationRequest;
import com.election.dto.NominationUpdateRequest;
import com.election.model.Candidate;
import com.election.model.Election;
import com.election.model.ElectionResult;
import com.election.model.ElectionStatus;
import com.election.model.Nomination;
import com.election.service.CandidateService;
import com.election.service.ElectionService;
import com.election.service.NominationService;
import com.election.service.ResultService;
import com.election.service.VotingService;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {
    
    @Autowired
    private CandidateService candidateService;
    
    @Autowired
    private NominationService nominationService;
    
    @Autowired
    private VotingService votingService;
    
    @Autowired
    private ResultService resultService;
    
    @Autowired
    private ElectionService electionService;
    
    @PostMapping("/nominate")
    public ResponseEntity<?> submitNomination(@Valid @RequestBody NominationRequest nominationRequest, Authentication auth) {
        // ✅ Get candidate ID from logged-in user, not from request
        String username = auth.getName();
        Long candidateId = candidateService.getCandidateByUsername(username).getId();
        
        Nomination nomination = new Nomination();
        nomination.setManifestoUrl(nominationRequest.getManifestoUrl());
        nomination.setAffidavitUrl(nominationRequest.getAffidavitUrl());
        nomination.setNominationFormUrl(nominationRequest.getNominationFormUrl());
        
        Nomination savedNomination = nominationService.submitNomination(
            nomination,
            candidateId,  // ← From authentication, not request
            nominationRequest.getElectionId()
        );
        
        return ResponseEntity.ok(savedNomination);
    }
    
    @GetMapping("/nominations")
    public ResponseEntity<?> getMyNominations(Authentication auth) {
        String username = auth.getName();
        Long candidateId = candidateService.getCandidateByUsername(username).getId();
        return ResponseEntity.ok(nominationService.getNominationsByCandidate(candidateId));
    }
    
//    @GetMapping("/elections/active")
//    public ResponseEntity<?> getActiveElections() {
//        // Get elections where candidate can participate
//        return ResponseEntity.ok("Active elections list");
//    }
//    
    @PutMapping("/nominations/{id}")
    public ResponseEntity<?> updateNomination(
            @PathVariable Long id,
            @Valid @RequestBody NominationUpdateRequest updateRequest,
            Authentication auth) {
        
        String username = auth.getName();
        Long candidateId = candidateService.getCandidateByUsername(username).getId();
        
        Nomination nomination = new Nomination();
        nomination.setManifestoUrl(updateRequest.getManifestoUrl());
        nomination.setAffidavitUrl(updateRequest.getAffidavitUrl());
        nomination.setNominationFormUrl(updateRequest.getNominationFormUrl());
        
        Nomination updatedNomination = nominationService.updateNomination(id, nomination, candidateId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Nomination updated successfully");
        response.put("nomination", updatedNomination);
        return ResponseEntity.ok(response);
    }
    // ✅ GET single nomination by ID
    @GetMapping("/nominations/{id}")
    public ResponseEntity<?> getNominationById(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        Long candidateId = candidateService.getCandidateByUsername(username).getId();
        return ResponseEntity.ok(nominationService.getNominationByIdAndCandidate(id, candidateId));
    }
    // ✅ DELETE nomination (only if PENDING)
    @DeleteMapping("/nominations/{id}")
    public ResponseEntity<?> deleteNomination(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        Long candidateId = candidateService.getCandidateByUsername(username).getId();
        
        nominationService.deleteNomination(id, candidateId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Nomination deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/elections/active")
    public ResponseEntity<?> getActiveElections(Authentication auth) {
        try {
            String username = auth.getName();
            Long candidateId = candidateService.getCandidateByUsername(username).getId();
            Candidate candidate = candidateService.getCandidateById(candidateId);
            
            // Get elections where candidate can participate
            // Elections that are in NOMINATION_ONGOING or ELECTION_ONGOING status
            // And belong to candidate's constituency
            List<Election> activeElections = electionService.getActiveElectionsForConstituency(
                candidate.getConstituency().getId()
            );
            
            List<ElectionResponseDTO> response = activeElections.stream()
                .map(ElectionResponseDTO::new)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<>()); // Return empty array on error
        }
    }
    @GetMapping("/results")
    public ResponseEntity<?> viewResults(@RequestParam Long electionId) {
        return ResponseEntity.ok(resultService.getElectionResults(electionId));
    }
    @GetMapping("/elections/completed")
    public ResponseEntity<?> getCompletedElections(Authentication auth) {
        try {
            String username = auth.getName();
            Candidate candidate = candidateService.getCandidateByUsername(username);
            
            if (candidate.getConstituency() == null) {
                return ResponseEntity.ok(List.of());
            }
            
            // Get completed elections for candidate's constituency
            List<Election> completedElections = electionService.getCompletedElectionsForConstituency(
                candidate.getConstituency().getId()
            );
            
            List<ElectionResponseDTO> response = completedElections.stream()
                .map(ElectionResponseDTO::new)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }
    
    @GetMapping("/elections/{id}/results")
    public ResponseEntity<?> getElectionResults(@PathVariable Long id, Authentication auth) {
        try {
            String username = auth.getName();
            Candidate candidate = candidateService.getCandidateByUsername(username);
            
            Election election = electionService.getElectionById(id);
            
            // Verify election is completed
            if (election.getStatus() != ElectionStatus.COMPLETED) {
                return ResponseEntity.badRequest().body("Results are only available for completed elections");
            }
            
            // Verify candidate belongs to the same constituency
            if (!candidate.getConstituency().getId().equals(election.getConstituency().getId())) {
                return ResponseEntity.status(403).body("You don't have access to results for this constituency");
            }
            
            List<ElectionResult> results = resultService.getElectionResults(id);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching results: " + e.getMessage());
        }
    }
    
    @GetMapping("/elections/{id}/winner")
    public ResponseEntity<?> getWinner(@PathVariable Long id, Authentication auth) {
        try {
            String username = auth.getName();
            Candidate candidate = candidateService.getCandidateByUsername(username);
            
            Election election = electionService.getElectionById(id);
            
            // Verify election is completed
            if (election.getStatus() != ElectionStatus.COMPLETED) {
                return ResponseEntity.badRequest().body("Winner is only available for completed elections");
            }
            
            // Verify candidate belongs to the same constituency
            if (!candidate.getConstituency().getId().equals(election.getConstituency().getId())) {
                return ResponseEntity.status(403).body("Access denied");
            }
            
            ElectionResult winner = resultService.getWinningCandidate(id);
            return ResponseEntity.ok(winner);
        } catch (Exception e) {
            return ResponseEntity.ok(null);
        }
    }
    @GetMapping("/elections/{electionId}/candidates")
    public ResponseEntity<?> getCandidatesByElection(@PathVariable Long electionId, Authentication auth) {
        try {
            // Get all ACCEPTED nominations for this election
            List<Nomination> acceptedNominations = nominationService.getAcceptedNominationsByElection(electionId);
            
            List<Candidate> candidates = acceptedNominations.stream()
                .map(Nomination::getCandidate)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(candidates);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }
}