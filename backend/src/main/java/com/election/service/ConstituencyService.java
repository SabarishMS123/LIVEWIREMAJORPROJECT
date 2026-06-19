package com.election.service;

import com.election.model.Candidate;
import com.election.model.Constituency;
import com.election.model.ElectionResult;
import com.election.repository.CandidateRepository;
import com.election.repository.ConstituencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.election.model.Constituency;
import com.election.model.Election;
import com.election.model.ElectionResult;
import com.election.model.Nomination;
import com.election.model.User;
import com.election.model.Vote;
import com.election.model.Voter;
import com.election.repository.ConstituencyRepository;
import com.election.repository.ElectionRepository;
import com.election.repository.ElectionResultRepository;
import com.election.repository.NominationRepository;
import com.election.repository.UserRepository;
import com.election.repository.VoteRepository;
import com.election.repository.VoterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ConstituencyService {
    
    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private NominationRepository nominationRepository;
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private ElectionResultRepository electionResultRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VoterRepository voterRepository; 
    @Transactional
    public Constituency createConstituency(Constituency constituency) {
        if (constituencyRepository.findByName(constituency.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
                "Constituency with name '" + constituency.getName() + "' already exists");
        }
        return constituencyRepository.save(constituency);
    }
    
    @Transactional
    public Constituency updateConstituency(Long id, Constituency constituencyDetails) {
        Constituency constituency = constituencyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                "Constituency not found with id: " + id));
        
        constituency.setName(constituencyDetails.getName());
        constituency.setCode(constituencyDetails.getCode());
        constituency.setState(constituencyDetails.getState());
        constituency.setTotalVoters(constituencyDetails.getTotalVoters());
        
        return constituencyRepository.save(constituency);
    }
    
    public List<Constituency> getAllConstituencies() {
        return constituencyRepository.findAll();
    }
    
    public Constituency getConstituencyById(Long id) {
        return constituencyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                "Constituency not found with id: " + id));
    }
    
    // ✅ FIXED: Return Optional instead of throwing exception
    public Optional<Constituency> getConstituencyByName(String name) {
        return constituencyRepository.findByName(name);
    }
    
    public List<Constituency> getConstituenciesByState(String state) {
        return constituencyRepository.findByState(state);
    }
    
    @Transactional
    public void deleteConstituency(Long id) {
        Constituency constituency = constituencyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                "Constituency not found with id: " + id));
        
        if (constituency.getElections() != null && !constituency.getElections().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
                "Cannot delete constituency as it has associated elections");
        }
        
        constituencyRepository.delete(constituency);
    }
    
    @Transactional
    public Constituency updateTotalVoters(Long id, Integer totalVoters) {
        Constituency constituency = getConstituencyById(id);
        constituency.setTotalVoters(totalVoters);
        return constituencyRepository.save(constituency);
    }
    
    public long getConstituencyCount() {
        return constituencyRepository.count();
    }
//    @Transactional
//    public void forceDeleteConstituency(Long id) {
//        try {
//            System.out.println("🗑️ Force deleting constituency with ID: " + id);
//            
//            Constituency constituency = constituencyRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Constituency not found with id: " + id));
//            
//            System.out.println("📋 Constituency name: " + constituency.getName());
//            
//            // ========== STEP 1: Get all elections first ==========
//            List<Election> elections = electionRepository.findByConstituency(constituency);
//            
//            if (elections != null && !elections.isEmpty()) {
//                System.out.println("📋 Found " + elections.size() + " elections to delete");
//                
//                for (Election election : elections) {
//                    System.out.println("  🗳️ Processing election: " + election.getName());
//                    
//                    // ✅ STEP 1a: Delete nominations for this election FIRST
//                    List<Nomination> nominations = nominationRepository.findByElection(election);
//                    if (!nominations.isEmpty()) {
//                        System.out.println("    📄 Deleting " + nominations.size() + " nominations");
//                        nominationRepository.deleteAll(nominations);
//                    }
//                    
//                    // ✅ STEP 1b: Delete votes for this election
//                    List<Vote> votes = voteRepository.findByElection(election);
//                    if (!votes.isEmpty()) {
//                        System.out.println("    🗳️ Deleting " + votes.size() + " votes");
//                        voteRepository.deleteAll(votes);
//                    }
//                    
//                    // ✅ STEP 1c: Delete election results for this election
//                    List<ElectionResult> results = electionResultRepository.findByElection(election);
//                    if (!results.isEmpty()) {
//                        System.out.println("    📊 Deleting " + results.size() + " election results");
//                        electionResultRepository.deleteAll(results);
//                    }
//                }
//            }
//            
//            // ========== STEP 2: Get all candidates for this constituency ==========
//            List<Candidate> candidates = candidateRepository.findByConstituency(constituency);
//            
//            if (candidates != null && !candidates.isEmpty()) {
//                System.out.println("👥 Found " + candidates.size() + " candidates to delete");
//                
//                for (Candidate candidate : candidates) {
//                    // ✅ STEP 2a: Delete user associated with candidate
//                    if (candidate.getUser() != null) {
//                        System.out.println("  👤 Deleting user: " + candidate.getUser().getUsername());
//                        userRepository.delete(candidate.getUser());
//                    }
//                }
//                
//                // ✅ STEP 2b: Delete all candidates (nominations already deleted in step 1)
//                candidateRepository.deleteAll(candidates);
//                System.out.println("✅ Deleted " + candidates.size() + " candidates");
//            }
//            
//            // ========== STEP 3: Delete all elections ==========
//            if (elections != null && !elections.isEmpty()) {
//                System.out.println("🗑️ Deleting " + elections.size() + " elections");
//                electionRepository.deleteAll(elections);
//            }
//            
//            // ========== STEP 4: Delete the constituency ==========
//            System.out.println("✅ Deleting constituency: " + constituency.getName());
//            constituencyRepository.delete(constituency);
//            
//            System.out.println("✅ Force delete completed successfully!");
//            
//        } catch (Exception e) {
//            System.err.println("❌ Error in forceDeleteConstituency: " + e.getMessage());
//            e.printStackTrace();
//            throw new RuntimeException("Failed to force delete constituency: " + e.getMessage());
//        }
//    }
//    @Transactional
//    public void forceDeleteConstituency(Long id) {
//        try {
//            System.out.println("🗑️ Force deleting constituency with ID: " + id);
//            
//            Constituency constituency = constituencyRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Constituency not found with id: " + id));
//            
//            System.out.println("📋 Constituency name: " + constituency.getName());
//            
//            // ========== STEP 1: Delete all voters in this constituency ==========
//            List<Voter> voters = voterRepository.findByConstituency(constituency);
//            if (voters != null && !voters.isEmpty()) {
//                System.out.println("👥 Found " + voters.size() + " voters to delete");
//                
//                for (Voter voter : voters) {
//                    // Delete votes cast by this voter
//                    List<Vote> voterVotes = voteRepository.findByVoter(voter);
//                    if (!voterVotes.isEmpty()) {
//                        System.out.println("  🗳️ Deleting " + voterVotes.size() + " votes for voter: " + voter.getName());
//                        voteRepository.deleteAll(voterVotes);
//                    }
//                    
//                    // Delete user associated with voter
//                    if (voter.getUser() != null) {
//                        System.out.println("  👤 Deleting user: " + voter.getUser().getUsername());
//                        userRepository.delete(voter.getUser());
//                    }
//                }
//                
//                // Delete all voters
//                voterRepository.deleteAll(voters);
//                System.out.println("✅ Deleted " + voters.size() + " voters");
//            }
//            
//            // ========== STEP 2: Get all elections for this constituency ==========
//            List<Election> elections = electionRepository.findByConstituency(constituency);
//            
//            if (elections != null && !elections.isEmpty()) {
//                System.out.println("📋 Found " + elections.size() + " elections to delete");
//                
//                for (Election election : elections) {
//                    System.out.println("  🗳️ Processing election: " + election.getName());
//                    
//                    // Delete nominations for this election
//                    List<Nomination> nominations = nominationRepository.findByElection(election);
//                    if (!nominations.isEmpty()) {
//                        System.out.println("    📄 Deleting " + nominations.size() + " nominations");
//                        nominationRepository.deleteAll(nominations);
//                    }
//                    
//                    // Delete votes for this election (already handled above, but ensure)
//                    List<Vote> votes = voteRepository.findByElection(election);
//                    if (!votes.isEmpty()) {
//                        System.out.println("    🗳️ Deleting " + votes.size() + " votes");
//                        voteRepository.deleteAll(votes);
//                    }
//                    
//                    // Delete election results for this election
//                    List<ElectionResult> results = electionResultRepository.findByElection(election);
//                    if (!results.isEmpty()) {
//                        System.out.println("    📊 Deleting " + results.size() + " election results");
//                        electionResultRepository.deleteAll(results);
//                    }
//                }
//            }
//            
//            // ========== STEP 3: Get all candidates for this constituency ==========
//            List<Candidate> candidates = candidateRepository.findByConstituency(constituency);
//            
//            if (candidates != null && !candidates.isEmpty()) {
//                System.out.println("👥 Found " + candidates.size() + " candidates to delete");
//                
//                for (Candidate candidate : candidates) {
//                    // Delete user associated with candidate
//                    if (candidate.getUser() != null) {
//                        System.out.println("  👤 Deleting user: " + candidate.getUser().getUsername());
//                        userRepository.delete(candidate.getUser());
//                    }
//                }
//                
//                // Delete all candidates
//                candidateRepository.deleteAll(candidates);
//                System.out.println("✅ Deleted " + candidates.size() + " candidates");
//            }
//            
//            // ========== STEP 4: Delete all elections ==========
//            if (elections != null && !elections.isEmpty()) {
//                System.out.println("🗑️ Deleting " + elections.size() + " elections");
//                electionRepository.deleteAll(elections);
//            }
//            
//            // ========== STEP 5: Delete the constituency ==========
//            System.out.println("✅ Deleting constituency: " + constituency.getName());
//            constituencyRepository.delete(constituency);
//            
//            System.out.println("✅ Force delete completed successfully!");
//            
//        } catch (Exception e) {
//            System.err.println("❌ Error in forceDeleteConstituency: " + e.getMessage());
//            e.printStackTrace();
//            throw new RuntimeException("Failed to force delete constituency: " + e.getMessage());
//        }
//    }
    
    
    @Transactional
    public void forceDeleteConstituency(Long id) {
        try {
            System.out.println("🗑️ Force deleting constituency with ID: " + id);
            
            Constituency constituency = constituencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Constituency not found with id: " + id));
            
            System.out.println("📋 Constituency name: " + constituency.getName());
            
            // ========== STEP 1: Get all elections for this constituency FIRST ==========
            List<Election> elections = electionRepository.findByConstituency(constituency);
            
            // Store all candidate IDs from these elections to delete results later
            List<Long> candidateIdsInElections = new ArrayList<>();
            
            if (elections != null && !elections.isEmpty()) {
                System.out.println("📋 Found " + elections.size() + " elections to delete");
                
                for (Election election : elections) {
                    System.out.println("  🗳️ Processing election: " + election.getName());
                    
                    // 1a. Delete nominations for this election
                    List<Nomination> nominations = nominationRepository.findByElection(election);
                    if (!nominations.isEmpty()) {
                        System.out.println("    📄 Deleting " + nominations.size() + " nominations");
                        nominationRepository.deleteAll(nominations);
                    }
                    
                    // 1b. Delete election results for this election (BEFORE deleting candidates)
                    List<ElectionResult> results = electionResultRepository.findByElection(election);
                    if (!results.isEmpty()) {
                        System.out.println("    📊 Deleting " + results.size() + " election results");
                        electionResultRepository.deleteAll(results);
                    }
                    
                    // 1c. Collect candidate IDs from this election
                    for (ElectionResult result : results) {
                        if (result.getCandidate() != null) {
                            candidateIdsInElections.add(result.getCandidate().getId());
                        }
                    }
                }
            }
            
            // ========== STEP 2: Delete all voters in this constituency ==========
            List<Voter> voters = voterRepository.findByConstituency(constituency);
            if (voters != null && !voters.isEmpty()) {
                System.out.println("👥 Found " + voters.size() + " voters to delete");
                
                for (Voter voter : voters) {
                    // Delete votes cast by this voter
                    List<Vote> voterVotes = voteRepository.findByVoter(voter);
                    if (!voterVotes.isEmpty()) {
                        System.out.println("  🗳️ Deleting " + voterVotes.size() + " votes for voter: " + voter.getName());
                        voteRepository.deleteAll(voterVotes);
                    }
                    
                    User userToDelete = voter.getUser();
                    voterRepository.delete(voter);
                    
                    if (userToDelete != null) {
                        System.out.println("  👤 Deleting user: " + userToDelete.getUsername());
                        userRepository.delete(userToDelete);
                    }
                }
                System.out.println("✅ Deleted " + voters.size() + " voters and their users");
            }
            
            // ========== STEP 3: Delete all candidates ==========
            List<Candidate> candidates = candidateRepository.findByConstituency(constituency);
            
            if (candidates != null && !candidates.isEmpty()) {
                System.out.println("👥 Found " + candidates.size() + " candidates to delete");
                
                for (Candidate candidate : candidates) {
                    // Delete any remaining nominations for this candidate
                    List<Nomination> candidateNominations = nominationRepository.findByCandidate(candidate);
                    if (!candidateNominations.isEmpty()) {
                        nominationRepository.deleteAll(candidateNominations);
                    }
                    
                    User userToDelete = candidate.getUser();
                    candidateRepository.delete(candidate);
                    
                    if (userToDelete != null) {
                        System.out.println("  👤 Deleting user: " + userToDelete.getUsername());
                        userRepository.delete(userToDelete);
                    }
                }
                System.out.println("✅ Deleted " + candidates.size() + " candidates");
            }
            
            // ========== STEP 4: Delete all elections ==========
            if (elections != null && !elections.isEmpty()) {
                System.out.println("🗑️ Deleting " + elections.size() + " elections");
                electionRepository.deleteAll(elections);
            }
            
            // ========== STEP 5: Delete the constituency ==========
            System.out.println("✅ Deleting constituency: " + constituency.getName());
            constituencyRepository.delete(constituency);
            
            System.out.println("✅ Force delete completed successfully!");
            
        } catch (Exception e) {
            System.err.println("❌ Error in forceDeleteConstituency: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to force delete constituency: " + e.getMessage());
        }
    }

}