package com.election.controller;

import com.election.dto.ElectionRequest;
import com.election.dto.ElectionResponseDTO;
import com.election.dto.VoterRequest;
import com.election.model.Constituency;
import com.election.model.Election;
import com.election.model.ElectionStatus;
import com.election.model.Nomination;
import com.election.model.Party;
import com.election.model.Voter;
import com.election.repository.ElectionRepository;
import com.election.service.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;  // ✅ CORRECT!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ro")
@CrossOrigin(origins = "http://localhost:5173")
public class ROController {
    
    @Autowired
    private ElectionService electionService;
    
    @Autowired
    private NominationService nominationService;
    
    @Autowired
    private ConstituencyService constituencyService;  // Now properly injected
    
    @Autowired
    private VoterService voterService;
    
    @Autowired
    private PartyService partyService;
    
    @Autowired
    private VotingService votingService;
    
    @Autowired
    private ResultService resultService;
    
    @Autowired
    private ElectionRepository electionRepository;
    
    // Constituency Management
    @PostMapping("/constituencies")
    public ResponseEntity<?> createConstituency(@Valid @RequestBody Constituency constituency) {
        return ResponseEntity.status(HttpStatus.CREATED).body(constituencyService.createConstituency(constituency));
    }
    
    @PutMapping("/constituencies/{id}")
    public ResponseEntity<?> updateConstituency(@PathVariable Long id, @Valid @RequestBody Constituency constituency) {
        return ResponseEntity.ok(constituencyService.updateConstituency(id, constituency));
    }
    
    @GetMapping("/constituencies")
    public ResponseEntity<?> getAllConstituencies() {
        return ResponseEntity.ok(constituencyService.getAllConstituencies());
    }
    
    @GetMapping("/constituencies/{id}")
    public ResponseEntity<?> getConstituencyById(@PathVariable Long id) {
        return ResponseEntity.ok(constituencyService.getConstituencyById(id));
    }
    
    @GetMapping("/constituencies/state/{state}")
    public ResponseEntity<?> getConstituenciesByState(@PathVariable String state) {
        return ResponseEntity.ok(constituencyService.getConstituenciesByState(state));
    }
 // Make sure this method exists in your ROController
    @GetMapping("/constituencies/search")
    public Optional<Constituency> searchConstituencyByName(@RequestParam String name) {
        return constituencyService.getConstituencyByName(name);
    }
//    @DeleteMapping("/constituencies/{id}/force")
//    public ResponseEntity<?> forceDeleteConstituency(@PathVariable Long id) {
//        try {
//            System.out.println("🔍 Force delete request for constituency ID: " + id);
//            constituencyService.forceDeleteConstituency(id);
//            
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Constituency and all associated elections deleted successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            System.err.println("❌ Error force deleting constituency: " + e.getMessage());
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("error", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
//        }
//    }
    @DeleteMapping("/constituencies/{id}/force")
    public ResponseEntity<?> forceDeleteConstituency(@PathVariable Long id) {
        try {
            System.out.println("🔍 FORCE DELETE request for constituency ID: " + id);
            constituencyService.forceDeleteConstituency(id);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Constituency and all associated elections deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error force deleting constituency: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    @DeleteMapping("/constituencies/{id}")
    public ResponseEntity<?> deleteConstituency(@PathVariable Long id) {
        constituencyService.deleteConstituency(id);
        return ResponseEntity.ok("Constituency deleted successfully");
    }
    
    @PutMapping("/constituencies/{id}/total-voters")
    public ResponseEntity<?> updateTotalVoters(@PathVariable Long id, @RequestParam Integer totalVoters) {
        return ResponseEntity.ok(constituencyService.updateTotalVoters(id, totalVoters));
    }
    
    // Election Management
    @PostMapping("/elections")
    public ResponseEntity<?> scheduleElection(@Valid @RequestBody ElectionRequest electionRequest) {
        Election election = new Election();
        election.setName(electionRequest.getName());
        election.setDescription(electionRequest.getDescription());
        election.setNominationStartDate(electionRequest.getNominationStartDate());
        election.setNominationEndDate(electionRequest.getNominationEndDate());
        election.setElectionStartDate(electionRequest.getElectionStartDate());
        election.setElectionEndDate(electionRequest.getElectionEndDate());
        
        Constituency constituency = constituencyService.getConstituencyById(electionRequest.getConstituencyId());
        election.setConstituency(constituency);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(electionService.scheduleElection(election));
    }
    
    @GetMapping("/elections")
    public ResponseEntity<?> getAllElections() {
        List<Election> elections = electionService.getAllElections();
        List<ElectionResponseDTO> response = elections.stream()
            .map(ElectionResponseDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/elections/{id}")
    public ResponseEntity<?> getElectionById(@PathVariable Long id) {
        Election election = electionService.getElectionById(id);
        return ResponseEntity.ok(new ElectionResponseDTO(election));
    }
    
//    @GetMapping("/elections/constituency/{constituencyId}")
//    public ResponseEntity<?> getElectionsByConstituency(@PathVariable Long constituencyId) {
//        return ResponseEntity.ok(electionService.getElectionsByConstituency(constituencyId));
//    }
    
    @PutMapping("/elections/{id}/start-nomination")
    public ResponseEntity<?> startNomination(@PathVariable Long id) {
        electionService.startNomination(id);
        return ResponseEntity.ok("Nomination started successfully");
    }
    
    @PutMapping("/elections/{id}/end-nomination")
    public ResponseEntity<?> endNomination(@PathVariable Long id) {
        electionService.endNomination(id);
        return ResponseEntity.ok("Nomination ended successfully");
    }
    
    @PutMapping("/elections/{id}/start-election")
    public ResponseEntity<?> startElection(@PathVariable Long id) {
        electionService.startElection(id);
        return ResponseEntity.ok("Election started successfully");
    }
    
    @PutMapping("/elections/{id}/end-election")
    public ResponseEntity<?> endElection(@PathVariable Long id) {
        electionService.endElection(id);
        return ResponseEntity.ok("Election ended successfully");
    }
    @GetMapping("/elections/active")
    public ResponseEntity<?> getActiveElections(Authentication auth) {
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        return ResponseEntity.ok("Active elections list for constituency: " + voter.getConstituency().getName());
    }
    @DeleteMapping("/elections/{id}")
    public ResponseEntity<?> deleteElection(@PathVariable Long id) {
        try {
            electionService.deleteElection(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Election deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }
    
    // ✅ SEARCH Elections (Advanced)
    @GetMapping("/elections/search")
    public ResponseEntity<?> searchElections(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long constituencyId,
            @RequestParam(required = false) String status) {
        
        try {
            System.out.println("🔍 Searching elections - Name: " + name + ", ConstituencyId: " + constituencyId + ", Status: " + status);
            
            ElectionStatus electionStatus = null;
            if (status != null && !status.isEmpty()) {
                try {
                    electionStatus = ElectionStatus.valueOf(status);
                } catch (IllegalArgumentException e) {
                    // Invalid status, ignore
                }
            }
            
            List<Election> elections = electionRepository.searchElections(name, constituencyId, electionStatus);
            System.out.println("✅ Found " + elections.size() + " elections");
            return ResponseEntity.ok(elections);
        } catch (Exception e) {
            System.err.println("❌ Search error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
     
    // ✅ GET Elections by Constituency ID
    @GetMapping("/elections/constituency/{constituencyId}")
    public ResponseEntity<?> getElectionsByConstituencyId(@PathVariable Long constituencyId) {
        try {
            List<Election> elections = electionService.searchElectionsByConstituencyId(constituencyId);
            return ResponseEntity.ok(elections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
    
    // ✅ GET Elections by Status
    @GetMapping("/elections/status/{status}")
    public ResponseEntity<?> getElectionsByStatus(@PathVariable String status) {
        try {
            ElectionStatus electionStatus = ElectionStatus.valueOf(status);
            List<Election> elections = electionService.searchElectionsByStatus(electionStatus);
            return ResponseEntity.ok(elections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        String username = auth.getName();
        Voter voter = voterService.getVoterByUsername(username);
        return ResponseEntity.ok(voter);
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody VoterRequest voterRequest, Authentication auth) {
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
    // Nomination Management
    @GetMapping("/nominations")
    public ResponseEntity<?> getAllNominations(@RequestParam Long electionId) {
        return ResponseEntity.ok(nominationService.getNominationsByElection(electionId));
    }
    
    @GetMapping("/nominations/pending")
    public ResponseEntity<?> getPendingNominations(@RequestParam Long electionId) {
        return ResponseEntity.ok(nominationService.getPendingNominationsByElection(electionId));
    }
    
    @PutMapping("/nominations/{id}/accept")
    public ResponseEntity<?> acceptNomination(@PathVariable Long id) {
        return ResponseEntity.ok(nominationService.acceptNomination(id));
    }
    
    @PutMapping("/nominations/{id}/reject")
    public ResponseEntity<?> rejectNomination(@PathVariable Long id, @RequestParam String reason) {
        return ResponseEntity.ok(nominationService.rejectNomination(id, reason));
    }
    
    // Party Management
    @GetMapping("/parties")
    public ResponseEntity<?> getAllParties() {
        return ResponseEntity.ok(partyService.getAllParties());
    }
    
    @GetMapping("/parties/{id}")
    public ResponseEntity<?> getPartyById(@PathVariable Long id) {
        return ResponseEntity.ok(partyService.getPartyById(id));
    }
    
    @PutMapping("/parties/{id}/approve")
    public ResponseEntity<?> approveParty(@PathVariable Long id) {
        Party party = partyService.getPartyById(id);
        party.setApproved(true);
        partyService.updateParty(id, party);
        return ResponseEntity.ok("Party approved successfully");
    }
    
    // Voter Management
//    @PostMapping("/voters/register")
//    public ResponseEntity<?> registerVoter(@Valid @RequestBody VoterRequest voterRequest) {
//        Voter voter = new Voter();
//        voter.setVoterId(voterRequest.getVoterId());
//        voter.setName(voterRequest.getName());
//        voter.setFatherName(voterRequest.getFatherName());
//        voter.setDateOfBirth(voterRequest.getDateOfBirth());
//        voter.setAddress(voterRequest.getAddress());
//        voter.setCity(voterRequest.getCity());
//        voter.setPincode(voterRequest.getPincode());
//        voter.setEmail(voterRequest.getEmail());
//        
//        Constituency constituency = constituencyService.getConstituencyById(voterRequest.getConstituencyId());
//        voter.setConstituency(constituency);
//        
//        Voter registeredVoter = voterService.registerVoter(
//            voter,
//            voterRequest.getUsername(),
//            voterRequest.getPassword()
//        );
//        
//        return ResponseEntity.status(HttpStatus.CREATED).body(registeredVoter);
//    }
    
    @GetMapping("/voters")
    public ResponseEntity<?> getAllVoters() {
        return ResponseEntity.ok(voterService.getAllVoters());
    }
    
    @GetMapping("/voters/{id}")
    public ResponseEntity<?> getVoterById(@PathVariable Long id) {
        return ResponseEntity.ok(voterService.getVoterById(id));
    }
    
    @PutMapping("/voters/{id}/verify")
    public ResponseEntity<?> verifyVoter(@PathVariable Long id) {
        Voter voter = voterService.getVoterById(id);
        Voter verifiedVoter = voterService.verifyVoter(voter.getVoterId());
        return ResponseEntity.ok(verifiedVoter);
    }
    @PutMapping("/voters/{id}")
    public ResponseEntity<?> updateVoter(@PathVariable Long id, @RequestBody VoterRequest voterRequest) {
        try {
            System.out.println("=== UPDATE VOTER ===");
            System.out.println("ID: " + id);
            System.out.println("Name: " + voterRequest.getName());
            System.out.println("Email: " + voterRequest.getEmail());
            System.out.println("ConstituencyId: " + voterRequest.getConstituencyId());
            
            // Get existing voter
            Voter existingVoter = voterService.getVoterById(id);
            
            // Update basic fields
            existingVoter.setName(voterRequest.getName());
            existingVoter.setFatherName(voterRequest.getFatherName());
            existingVoter.setDateOfBirth(voterRequest.getDateOfBirth());
            existingVoter.setAddress(voterRequest.getAddress());
            existingVoter.setCity(voterRequest.getCity());
            existingVoter.setPincode(voterRequest.getPincode());
            existingVoter.setEmail(voterRequest.getEmail());
            
            // Update constituency if provided
            if (voterRequest.getConstituencyId() != null) {
                Constituency constituency = constituencyService.getConstituencyById(voterRequest.getConstituencyId());
                existingVoter.setConstituency(constituency);
                System.out.println("Constituency updated to: " + constituency.getName());
            }
            
            // Update user email if changed
            if (existingVoter.getUser() != null) {
                existingVoter.getUser().setEmail(voterRequest.getEmail());
            }
            
            Voter updatedVoter = voterService.updateVoter(id, existingVoter);
            System.out.println("Update successful!");
            
            return ResponseEntity.ok(updatedVoter);
        } catch (Exception e) {
            System.err.println("Error updating voter: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/voters/constituency/{constituencyId}")
    public ResponseEntity<?> getVotersByConstituency(@PathVariable Long constituencyId) {
        return ResponseEntity.ok(voterService.getVotersByConstituency(constituencyId));
    }
    
    @DeleteMapping("/voters/all")
    public ResponseEntity<?> deleteAllVoters() {
        try {
            System.out.println("🔍 DELETE ALL VOTERS request received");
            voterService.deleteAllVoters();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "All voters deleted successfully");
            response.put("success", true);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting all voters: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // ✅ DELETE VOTERS BY CONSTITUENCY
    @DeleteMapping("/voters/constituency/{constituencyId}")
    public ResponseEntity<?> deleteVotersByConstituency(@PathVariable Long constituencyId) {
        try {
            System.out.println("🔍 DELETE voters for constituency ID: " + constituencyId);
            voterService.deleteVotersByConstituency(constituencyId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Voters deleted successfully for constituency");
            response.put("success", true);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voters by constituency: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // ✅ DELETE VOTERS BY VERIFICATION STATUS
    @DeleteMapping("/voters/status/{verified}")
    public ResponseEntity<?> deleteVotersByStatus(@PathVariable boolean verified) {
        try {
            System.out.println("🔍 DELETE " + (verified ? "verified" : "unverified") + " voters");
            voterService.deleteVotersByVerificationStatus(verified);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", (verified ? "Verified" : "Unverified") + " voters deleted successfully");
            response.put("success", true);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voters by status: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    @GetMapping("/voters/statistics")
    public ResponseEntity<?> getVoterStatistics() {
        long totalVoters = voterService.getAllVoters().size();
        long verifiedVoters = voterService.getVerifiedVoters().size();
        long unverifiedVoters = voterService.getUnverifiedVoters().size();
        
        return ResponseEntity.ok(Map.of(
            "totalVoters", totalVoters,
            "verifiedVoters", verifiedVoters,
            "unverifiedVoters", unverifiedVoters
        ));
    }
    @GetMapping("/voters/search")
    public ResponseEntity<?> searchVoters(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long constituencyId) {
        try {
            System.out.println("🔍 Searching voters - Keyword: " + keyword + ", ConstituencyId: " + constituencyId);
            
            List<Voter> voters;
            if (constituencyId != null) {
                // Search within specific constituency
                voters = voterService.searchVotersByConstituency(constituencyId, keyword);
            } else {
                // Global search
                voters = voterService.searchVoters(keyword);
            }
            
            System.out.println("✅ Found " + voters.size() + " voters");
            return ResponseEntity.ok(voters);
        } catch (Exception e) {
            System.err.println("❌ Search error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
    @DeleteMapping("/voters/{id}")
    public ResponseEntity<?> deleteVoter(@PathVariable Long id) {
        try {
            System.out.println("🔍 DELETE request for voter ID: " + id);
            voterService.deleteVoter(id);
            System.out.println("✅ Voter deleted successfully");
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Voter deleted successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voter: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("message", "Failed to delete voter: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    // Results
    @PostMapping("/elections/{id}/compute-results")
    public ResponseEntity<?> computeResults(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.computeElectionResults(id));
    }
    
    @GetMapping("/elections/{id}/results")
    public ResponseEntity<?> getResults(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getElectionResults(id));
    }
    
    @GetMapping("/elections/{id}/winner")
    public ResponseEntity<?> getWinner(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getWinningCandidate(id));
    }
}