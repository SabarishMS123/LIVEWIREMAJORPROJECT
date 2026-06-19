// ElectionController.java
package com.election.controller;

import com.election.model.Election;
import com.election.model.ElectionStatus;
import com.election.model.Constituency;
import com.election.repository.ElectionRepository;
import com.election.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private CandidateService candidateService;
    
    // EXISTING: Get active elections (voting phase)
    @GetMapping("/active")
    public ResponseEntity<List<Election>> getActiveElections() {
        List<Election> elections = electionRepository.findByStatus(ElectionStatus.ELECTION_ONGOING);
        return ResponseEntity.ok(elections);
    }
    
    // NEW: Get elections open for nomination (for candidates to apply)
    @GetMapping("/nomination-open")
    public ResponseEntity<List<Election>> getElectionsOpenForNomination() {
        List<Election> elections = electionRepository.findByStatus(ElectionStatus.NOMINATION_ONGOING);
        System.out.println("Found " + elections.size() + " elections open for nomination");
        return ResponseEntity.ok(elections);
    }
    
    // NEW: Get elections open for nomination for a specific candidate (by their constituency)
    @GetMapping("/nomination-open/my-constituency")
    public ResponseEntity<List<Election>> getElectionsOpenForNominationByConstituency(
            @AuthenticationPrincipal UserDetails currentUser) {
        
        if (currentUser == null) {
            return ResponseEntity.badRequest().build();
        }
        
        // Get candidate's constituency from your service
        Long constituencyId = candidateService.getCandidateConstituency(currentUser.getUsername());
        
        if (constituencyId == null) {
            return ResponseEntity.ok(List.of()); // Return empty if no constituency found
        }
        
        List<Election> elections = electionRepository
            .findByConstituencyIdAndStatus(constituencyId, ElectionStatus.NOMINATION_ONGOING);
        
        return ResponseEntity.ok(elections);
    }
    
    // EXISTING: Get completed elections
    @GetMapping("/completed")
    public ResponseEntity<List<Election>> getCompletedElections() {
        List<Election> elections = electionRepository.findByStatus(ElectionStatus.COMPLETED);
        return ResponseEntity.ok(elections);
    }
    
    // Optional: Get election by ID
    @GetMapping("/{id}")
    public ResponseEntity<Election> getElectionById(@PathVariable Long id) {
        return electionRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}