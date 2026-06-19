package com.election.controller;

import com.election.dto.ElectionResponseDTO;
import com.election.dto.VoteRequest;
import com.election.dto.VoterRequest;
import com.election.model.Voter;
import com.election.repository.ElectionRepository;
import com.election.model.Election;
import com.election.model.ElectionResult;
import com.election.model.ElectionStatus;
import com.election.model.Vote;
import com.election.service.ElectionService;
import com.election.service.ResultService;
import com.election.service.VoterService;
import com.election.service.VotingService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voter")
@CrossOrigin(origins = "http://localhost:5173")
public class VoterController {
    
    @Autowired
    private VoterService voterService;
    
    @Autowired
    private VotingService votingService;
    
    @Autowired
    private ResultService resultService;
    @Autowired
    private ElectionService electionService;
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @PostMapping("/register")
    public ResponseEntity<?> selfRegister(@Valid @RequestBody VoterRequest voterRequest) {
        Voter voter = new Voter();
        voter.setVoterId(voterRequest.getVoterId());
        voter.setName(voterRequest.getName());
        voter.setFatherName(voterRequest.getFatherName());
        voter.setDateOfBirth(voterRequest.getDateOfBirth());
        voter.setAddress(voterRequest.getAddress());
        voter.setCity(voterRequest.getCity());
        voter.setPincode(voterRequest.getPincode());
        voter.setEmail(voterRequest.getEmail());
        
        Voter registeredVoter = voterService.selfRegisterVoter(
            voter,
            voterRequest.getUsername(),
            voterRequest.getPassword(),
            voterRequest.getConstituencyId()
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredVoter);
    }
    
    @PostMapping("/cast-vote")
    public ResponseEntity<?> castVote(@Valid @RequestBody VoteRequest voteRequest, Authentication auth) {
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        Long voterId = voter.getId();
        
        Vote vote = new Vote();
        Vote castVote = votingService.castVote(
            vote,
            voterId,
            voteRequest.getCandidateId(),
            voteRequest.getElectionId()
        );
        
        return ResponseEntity.ok("Vote cast successfully");
    }
    
    @GetMapping("/has-voted")
    public ResponseEntity<?> hasVoted(@RequestParam Long electionId, Authentication auth) {
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        boolean hasVoted = votingService.hasVoterVoted(voter.getId(), electionId);
        return ResponseEntity.ok(hasVoted);
    }
//    @GetMapping("/elections/{id}/winner")
//    public ResponseEntity<?> getWinner(@PathVariable Long id) {
//        return ResponseEntity.ok(resultService.getWinningCandidate(id));
//    }
    
    @GetMapping("/elections/active")
    public ResponseEntity<?> getActiveElections(Authentication auth) {
        try {
            String username = auth.getName();
            Voter voter = voterService.getVoterByUsername(username);
            
            if (voter.getConstituency() == null) {
                return ResponseEntity.ok(List.of());
            }
            
            // Get elections that are in NOMINATION_ONGOING or ELECTION_ONGOING
            List<Election> activeElections = electionRepository.findByConstituencyAndStatusIn(
                voter.getConstituency(),
                List.of(ElectionStatus.NOMINATION_ONGOING, ElectionStatus.ELECTION_ONGOING)
            );
            
            List<ElectionResponseDTO> response = activeElections.stream()
                .map(ElectionResponseDTO::new)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error getting active elections: " + e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }
    
    @GetMapping("/results")
    public ResponseEntity<?> viewResults(@RequestParam Long electionId) {
        return ResponseEntity.ok(resultService.getElectionResults(electionId));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        // ✅ FIXED
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        return ResponseEntity.ok(voter);
    }
//    @GetMapping("/elections/completed")
//    public ResponseEntity<?> getCompletedElections(Authentication auth) {
//        try {
//            String username = auth.getName();
//            Voter voter = voterService.getVoterByUsername(username);
//            
//            if (voter.getConstituency() == null) {
//                return ResponseEntity.ok(List.of());
//            }
//            
//            // Get completed elections for voter's constituency
//            List<Election> completedElections = electionRepository.findByConstituencyAndStatus(
//                voter.getConstituency(),
//                ElectionStatus.COMPLETED
//            );
//            
//            List<ElectionResponseDTO> response = completedElections.stream()
//                .map(ElectionResponseDTO::new)
//                .collect(Collectors.toList());
//            
//            System.out.println("📊 Found " + response.size() + " completed elections for constituency: " + voter.getConstituency().getName());
//            return ResponseEntity.ok(response);
//            
//        } catch (Exception e) {
//            System.err.println("❌ Error getting completed elections: " + e.getMessage());
//            return ResponseEntity.ok(List.of());
//        }
//    }
    // ✅ GET completed elections for voter
    @GetMapping("/elections/completed")
    public ResponseEntity<?> getCompletedElections(Authentication auth) {
        try {
            String username = auth.getName();
            Voter voter = voterService.getVoterByUsername(username);
            
            if (voter.getConstituency() == null) {
                return ResponseEntity.ok(List.of());
            }
            
            // Get completed elections for voter's constituency
            List<Election> completedElections = electionRepository.findByConstituencyAndStatus(
                voter.getConstituency(),
                ElectionStatus.COMPLETED
            );
            
            List<ElectionResponseDTO> response = completedElections.stream()
                .map(ElectionResponseDTO::new)
                .collect(Collectors.toList());
            
            System.out.println("📊 Found " + response.size() + " completed elections for constituency: " + voter.getConstituency().getName());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error getting completed elections: " + e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody VoterRequest voterRequest, Authentication auth) {
        // ✅ FIXED
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        
        Voter voterDetails = new Voter();
        voterDetails.setName(voterRequest.getName());
        voterDetails.setFatherName(voterRequest.getFatherName());
        voterDetails.setDateOfBirth(voterRequest.getDateOfBirth());
        voterDetails.setAddress(voterRequest.getAddress());
        voterDetails.setCity(voterRequest.getCity());
        voterDetails.setPincode(voterRequest.getPincode());
        
        Voter updatedVoter = voterService.updateVoter(voter.getId(), voterDetails);
        return ResponseEntity.ok(updatedVoter);
    }
    // ✅ GET election results for voter (ADD THIS METHOD)
    @GetMapping("/elections/{id}/results")
    public ResponseEntity<?> getElectionResults(@PathVariable Long id, Authentication auth) {
        try {
            String username = auth.getName();
            Voter voter = voterService.getVoterByUsername(username);
            
            // Get the election
            Election election = electionService.getElectionById(id);
            
            // Verify election is completed
            if (election.getStatus() != ElectionStatus.COMPLETED) {
                return ResponseEntity.badRequest().body("Results are only available for completed elections");
            }
            
            // Verify voter belongs to the same constituency
            if (voter.getConstituency() == null || !voter.getConstituency().getId().equals(election.getConstituency().getId())) {
                return ResponseEntity.status(403).body("You don't have access to results for this constituency");
            }
            
            // Get results
            List<ElectionResult> results = resultService.getElectionResults(id);
            System.out.println("📊 Returning " + results.size() + " results for election: " + election.getName());
            return ResponseEntity.ok(results);
            
        } catch (Exception e) {
            System.err.println("❌ Error getting election results: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching results: " + e.getMessage());
        }
    }
    
    @GetMapping("/elections/{id}/winner")
    public ResponseEntity<?> getWinner(@PathVariable Long id, Authentication auth) {
        try {
            String username = auth.getName();
            Voter voter = voterService.getVoterByUsername(username);
            
            // Get the election
            Election election = electionService.getElectionById(id);
            
            // Verify election is completed
            if (election.getStatus() != ElectionStatus.COMPLETED) {
                return ResponseEntity.badRequest().body("Winner is only available for completed elections");
            }
            
            // Verify voter belongs to the same constituency
            if (voter.getConstituency() == null || !voter.getConstituency().getId().equals(election.getConstituency().getId())) {
                return ResponseEntity.status(403).body("You don't have access to winner for this constituency");
            }
            
            // Get winner
            ElectionResult winner = resultService.getWinningCandidate(id);
            System.out.println("🏆 Winner for election " + election.getName() + ": " + winner.getCandidate().getName());
            return ResponseEntity.ok(winner);
            
        } catch (Exception e) {
            System.err.println("❌ Error getting winner: " + e.getMessage());
            if (e.getMessage().contains("No results found")) {
                return ResponseEntity.ok(null);
            }
            return ResponseEntity.status(500).body("Error fetching winner: " + e.getMessage());
        }
    }
}