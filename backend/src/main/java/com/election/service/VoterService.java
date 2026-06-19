package com.election.service;

import com.election.model.Voter;
import com.election.model.User;
import com.election.model.Vote;
import com.election.model.Role;
import com.election.model.Constituency;
import com.election.repository.VoterRepository;
import com.election.repository.ConstituencyRepository;
import com.election.repository.UserRepository;
import com.election.repository.VoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class VoterService {
    
    @Autowired
    private VoterRepository voterRepository;
    
    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
//    @Autowired
//    private VoteRepository voteRepoistory;
    @Autowired
    private VoteRepository voteRepository;
    // ✅ NEW: Self Registration (No RO involvement)
    @Transactional
    public Voter selfRegisterVoter(Voter voter, String username, String password, Long constituencyId) {
        // Check if voter ID already exists
        if (voterRepository.existsByVoterId(voter.getVoterId())) {
            throw new RuntimeException("Voter ID already exists. Please check your Voter ID.");
        }
        
        // Check if email already registered
        if (voterRepository.existsByEmail(voter.getEmail())) {
            throw new RuntimeException("Email already registered. Please use a different email.");
        }
        
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already taken. Please choose a different username.");
        }
        
        if (userRepository.existsByEmail(voter.getEmail())) {
            throw new RuntimeException("Email already in use. Please use a different email.");
        }
        
        // Get constituency
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found with ID: " + constituencyId));
        
        // ✅ Create User account with verification
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(voter.getEmail());
        user.setRole(Role.VOTER);
        user.setVerified(false); // Not verified yet
        user.setVerificationToken(UUID.randomUUID().toString());
        User savedUser = userRepository.save(user);
        
        // ✅ Send verification email
        emailService.sendVerificationEmail(voter.getEmail(), user.getVerificationToken());
        
        System.out.println("✅ Verification email sent to: " + voter.getEmail());
        System.out.println("✅ Verification token: " + user.getVerificationToken());
        
        // Set voter details
        voter.setUser(savedUser);
        voter.setConstituency(constituency);
        voter.setVerified(false); // Pending verification
        voter.setHasVoted(false);
        
        // Save voter
        Voter savedVoter = voterRepository.save(voter);
        
        return savedVoter;
    }
    
    // ✅ RO verifies voter
    @Transactional
    public Voter verifyVoter(String voterId) {
        Voter voter = voterRepository.findByVoterId(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
        
        voter.setVerified(true);
        
        // Also verify the associated user
        User user = voter.getUser();
        user.setVerified(true);
        userRepository.save(user);
        
        return voterRepository.save(voter);
    }
    @Transactional
    public void deleteVoter(Long id) {
        try {
            System.out.println("🗑️ Attempting to delete voter with ID: " + id);
            
            Voter voter = voterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voter not found with id: " + id));
            
            System.out.println("📋 Found voter: " + voter.getName());
            
            // Step 1: Delete all votes cast by this voter
            List<Vote> votes = voteRepository.findByVoter(voter);
            if (!votes.isEmpty()) {
                System.out.println("🗳️ Deleting " + votes.size() + " votes cast by this voter");
                voteRepository.deleteAll(votes);
                voteRepository.flush(); // Force immediate deletion
            }
            
            // Step 2: Get the associated user
            User user = voter.getUser();
            
            // Step 3: Delete the voter
            voterRepository.delete(voter);
            voterRepository.flush();
            System.out.println("✅ Voter deleted successfully");
            
            // Step 4: Delete the associated user
            if (user != null) {
                System.out.println("👤 Deleting associated user: " + user.getUsername());
                userRepository.delete(user);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voter: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete voter: " + e.getMessage());
        }
    }
    
    
    // ✅ SEARCH Voters
 // ✅ Search voters globally
    public List<Voter> searchVoters(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return voterRepository.findAll();
        }
        return voterRepository.searchByKeyword(keyword.trim());
    }
    public List<Voter> searchVotersByConstituency(Long constituencyId, String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return voterRepository.findByConstituencyId(constituencyId);
        }
        return voterRepository.searchByKeywordAndConstituency(keyword.trim(), constituencyId);
    }
    
    @Transactional
    public Voter updateVoter(Long id, Voter voterDetails) {
        Voter voter = voterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Voter not found with id: " + id));
        
        // Update fields only if not null
        if (voterDetails.getName() != null) {
            voter.setName(voterDetails.getName());
        }
        if (voterDetails.getFatherName() != null) {
            voter.setFatherName(voterDetails.getFatherName());
        }
        if (voterDetails.getDateOfBirth() != null) {
            voter.setDateOfBirth(voterDetails.getDateOfBirth());
        }
        if (voterDetails.getAddress() != null) {
            voter.setAddress(voterDetails.getAddress());
        }
        if (voterDetails.getCity() != null) {
            voter.setCity(voterDetails.getCity());
        }
        if (voterDetails.getPincode() != null) {
            voter.setPincode(voterDetails.getPincode());
        }
        if (voterDetails.getEmail() != null) {
            voter.setEmail(voterDetails.getEmail());
            // Also update user email
            if (voter.getUser() != null) {
                voter.getUser().setEmail(voterDetails.getEmail());
                userRepository.save(voter.getUser());
            }
        }
        if (voterDetails.getConstituency() != null) {
            voter.setConstituency(voterDetails.getConstituency());
        }
        
        return voterRepository.save(voter);
    }
    
    public List<Voter> getAllVoters() {
        return voterRepository.findAll();
    }
    
    public Voter getVoterById(Long id) {
        return voterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
    }
    
    public Voter getVoterByUser(Long userId) {
        return voterRepository.findByUser_Id(userId)
            .orElseThrow(() -> new RuntimeException("Voter not found for this user"));
    }
    
    public Voter getVoterByVoterId(String voterId) {
        return voterRepository.findByVoterId(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found with ID: " + voterId));
    }
    
    public List<Voter> getVotersByConstituency(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        return voterRepository.findByConstituency(constituency);
    }
    
    public List<Voter> getVerifiedVoters() {
        return voterRepository.findByVerified(true);
    }
    
    public List<Voter> getUnverifiedVoters() {
        return voterRepository.findByVerified(false);
    }
    public Voter getVoterByUsername(String username) {
        return voterRepository.findByUser_Username(username)
            .orElseThrow(() -> new RuntimeException("Voter not found for username: " + username));
    }
    @Transactional
    public Voter markVoted(Long voterId) {
        Voter voter = voterRepository.findById(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
        voter.setHasVoted(true);
        return voterRepository.save(voter);
    }
    
    public boolean hasVoterVoted(Long voterId) {
        Voter voter = voterRepository.findById(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
        return voter.isHasVoted();
    }

    @Transactional
    public void deleteAllVoters() {
        try {
            System.out.println("🗑️ Attempting to delete ALL voters");
            
            // Step 1: Get all voters
            List<Voter> allVoters = voterRepository.findAll();
            
            if (allVoters.isEmpty()) {
                System.out.println("ℹ️ No voters found to delete");
                return;
            }
            
            System.out.println("📋 Total voters to delete: " + allVoters.size());
            
            // Step 2: Delete all votes first (foreign key constraint)
            int votesDeleted = voteRepository.deleteAllVotes();  // Now works with int return
            System.out.println("🗳️ Deleted " + votesDeleted + " votes");
            
            // Step 3: Get all users associated with voters
            List<User> usersToDelete = allVoters.stream()
                .map(Voter::getUser)
                .filter(user -> user != null)
                .toList();
            
            // Step 4: Delete all voters
            voterRepository.deleteAllInBatch(allVoters);
            System.out.println("✅ All voters deleted successfully");
            
            // Step 5: Delete all associated users
            if (!usersToDelete.isEmpty()) {
                userRepository.deleteAllInBatch(usersToDelete);
                System.out.println("👤 Deleted " + usersToDelete.size() + " associated users");
            }
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting all voters: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete all voters: " + e.getMessage());
        }
    }
    
    // ✅ DELETE VOTERS BY CONSTITUENCY - Fixed version
    @Transactional
    public void deleteVotersByConstituency(Long constituencyId) {
        try {
            System.out.println("🗑️ Deleting voters for constituency ID: " + constituencyId);
            
            List<Voter> voters = voterRepository.findByConstituencyId(constituencyId);
            
            if (voters.isEmpty()) {
                System.out.println("ℹ️ No voters found for this constituency");
                return;
            }
            
            // Delete votes for these voters
            for (Voter voter : voters) {
                voteRepository.deleteByVoter(voter);
            }
            
            // Delete voters
            voterRepository.deleteAllInBatch(voters);
            
            // Delete associated users
            List<User> usersToDelete = voters.stream()
                .map(Voter::getUser)
                .filter(user -> user != null)
                .toList();
            
            if (!usersToDelete.isEmpty()) {
                userRepository.deleteAllInBatch(usersToDelete);
            }
            
            System.out.println("✅ Deleted " + voters.size() + " voters from constituency");
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voters by constituency: " + e.getMessage());
            throw new RuntimeException("Failed to delete voters by constituency: " + e.getMessage());
        }
    }
    
    // ✅ DELETE VOTERS BY STATUS - Fixed version
    @Transactional
    public void deleteVotersByVerificationStatus(boolean verified) {
        try {
            System.out.println("🗑️ Deleting " + (verified ? "verified" : "unverified") + " voters");
            
            List<Voter> voters = voterRepository.findByVerified(verified);
            
            if (voters.isEmpty()) {
                System.out.println("ℹ️ No " + (verified ? "verified" : "unverified") + " voters found");
                return;
            }
            
            // Delete votes for these voters
            for (Voter voter : voters) {
                voteRepository.deleteByVoter(voter);
            }
            
            // Delete voters
            voterRepository.deleteAllInBatch(voters);
            
            // Delete associated users
            List<User> usersToDelete = voters.stream()
                .map(Voter::getUser)
                .filter(user -> user != null)
                .toList();
            
            if (!usersToDelete.isEmpty()) {
                userRepository.deleteAllInBatch(usersToDelete);
            }
            
            System.out.println("✅ Deleted " + voters.size() + " " + (verified ? "verified" : "unverified") + " voters");
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting voters by status: " + e.getMessage());
            throw new RuntimeException("Failed to delete voters by status: " + e.getMessage());
        }
    }
}