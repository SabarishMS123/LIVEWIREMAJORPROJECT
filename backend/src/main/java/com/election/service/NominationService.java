// NominationService.java
package com.election.service;

import com.election.model.*;
import com.election.repository.*;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NominationService {
    
    @Autowired
    private NominationRepository nominationRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private PartyRepository partyRepository;
    
    public Nomination submitNomination(Nomination nomination, Long candidateId, Long electionId) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + candidateId));
        
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found with id: " + electionId));
        
        Party party = candidate.getParty(); // Get party from candidate
        
        // Check if election is in nomination period
        if (election.getStatus() != ElectionStatus.NOMINATION_ONGOING) {
            throw new RuntimeException("Nominations are not open for this election. Current status: " + election.getStatus());
        }
        
        // Check if candidate already submitted nomination for this election
        if (nominationRepository.findByElectionAndCandidate(election, candidate).isPresent()) {
            throw new RuntimeException("Candidate has already submitted nomination for this election");
        }
        
        // Check if candidate belongs to correct constituency for this election
        if (!candidate.getConstituency().getId().equals(election.getConstituency().getId())) {
            throw new RuntimeException("Candidate is not from the constituency of this election");
        }
        
        nomination.setCandidate(candidate);
        nomination.setElection(election);
        nomination.setParty(party);
        nomination.setStatus(NominationStatus.PENDING);
        
        return nominationRepository.save(nomination);
    }
    
    public Nomination acceptNomination(Long nominationId) {
        Nomination nomination = nominationRepository.findById(nominationId)
            .orElseThrow(() -> new RuntimeException("Nomination not found"));
        
        nomination.setStatus(NominationStatus.ACCEPTED);
        return nominationRepository.save(nomination);
    }
    
    public Nomination rejectNomination(Long nominationId, String reason) {
        Nomination nomination = nominationRepository.findById(nominationId)
            .orElseThrow(() -> new RuntimeException("Nomination not found"));
        
        nomination.setStatus(NominationStatus.REJECTED);
        nomination.setRejectionReason(reason);
        return nominationRepository.save(nomination);
    }
    
    public List<Nomination> getNominationsByElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        return nominationRepository.findByElection(election);
    }
    
    public List<Nomination> getNominationsByCandidate(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
        return nominationRepository.findByCandidate(candidate);
    }
 // ✅ UPDATE existing nomination (for PENDING status)
    @Transactional
    public Nomination updateNomination(Long nominationId, Nomination updatedNomination, Long candidateId) {
        Nomination existing = nominationRepository.findById(nominationId)
            .orElseThrow(() -> new RuntimeException("Nomination not found with id: " + nominationId));
        
        // Verify the nomination belongs to the candidate
        if (!existing.getCandidate().getId().equals(candidateId)) {
            throw new RuntimeException("You can only update your own nominations");
        }
        
        // Only allow update if status is PENDING or REJECTED
        if (existing.getStatus() == NominationStatus.ACCEPTED) {
            throw new RuntimeException("Cannot modify an already accepted nomination");
        }
        
        // Update fields
        if (updatedNomination.getManifestoUrl() != null) {
            existing.setManifestoUrl(updatedNomination.getManifestoUrl());
        }
        if (updatedNomination.getAffidavitUrl() != null) {
            existing.setAffidavitUrl(updatedNomination.getAffidavitUrl());
        }
        if (updatedNomination.getNominationFormUrl() != null) {
            existing.setNominationFormUrl(updatedNomination.getNominationFormUrl());
        }
        
        // If it was rejected, reset to PENDING
        if (existing.getStatus() == NominationStatus.REJECTED) {
            existing.setStatus(NominationStatus.PENDING);
            existing.setRejectionReason(null);
        }
        
        existing.setSubmissionDate(LocalDateTime.now());
        
        return nominationRepository.save(existing);
    }
    @Transactional
    public void deleteNomination(Long nominationId, Long candidateId) {
        Nomination nomination = nominationRepository.findById(nominationId)
            .orElseThrow(() -> new RuntimeException("Nomination not found"));
        
        if (!nomination.getCandidate().getId().equals(candidateId)) {
            throw new RuntimeException("You can only delete your own nominations");
        }
        
        if (nomination.getStatus() == NominationStatus.ACCEPTED) {
            throw new RuntimeException("Cannot delete an accepted nomination");
        }
        
        nominationRepository.delete(nomination);
    }
    
    // ✅ GET nomination by ID with ownership check
    public Nomination getNominationByIdAndCandidate(Long nominationId, Long candidateId) {
        Nomination nomination = nominationRepository.findById(nominationId)
            .orElseThrow(() -> new RuntimeException("Nomination not found"));
        
        if (!nomination.getCandidate().getId().equals(candidateId)) {
            throw new RuntimeException("Access denied");
        }
        
        return nomination;
    }
    public List<Nomination> getAcceptedNominationsByElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        return nominationRepository.findByElectionAndStatus(election, NominationStatus.ACCEPTED);
    }
//    public Nomination acceptNomination(Long nominationId) {
//        Nomination nomination = nominationRepository.findById(nominationId)
//            .orElseThrow(() -> new RuntimeException("Nomination not found"));
//        
//        nomination.setStatus(NominationStatus.ACCEPTED);
//        nomination.setReviewedDate(LocalDateTime.now());
//        return nominationRepository.save(nomination);
//    }
    
//    public Nomination rejectNomination(Long nominationId, String reason) {
//        Nomination nomination = nominationRepository.findById(nominationId)
//            .orElseThrow(() -> new RuntimeException("Nomination not found"));
//        
//        nomination.setStatus(NominationStatus.REJECTED);
//        nomination.setRejectionReason(reason);
//        nomination.setReviewedDate(LocalDateTime.now());
//        return nominationRepository.save(nomination);
//    }
//    
//    public List<Nomination> getNominationsByElection(Long electionId) {
//        Election election = electionRepository.findById(electionId)
//            .orElseThrow(() -> new RuntimeException("Election not found"));
//        return nominationRepository.findByElection(election);
//    }
    
//    public List<Nomination> getNominationsByCandidate(Long candidateId) {
//        Candidate candidate = candidateRepository.findById(candidateId)
//            .orElseThrow(() -> new RuntimeException("Candidate not found"));
//        return nominationRepository.findByCandidate(candidate);
//    }
    
//    public List<Nomination> getPendingNominationsByElection(Long electionId) {
//        Election election = electionRepository.findById(electionId)
//            .orElseThrow(() -> new RuntimeException("Election not found"));
//        return nominationRepository.findByElectionAndStatus(election, NominationStatus.PENDING);
//    }
    public Nomination getNominationById(Long id) {
        return nominationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Nomination not found"));
    }
 // Add this method to NominationService.java
    public List<Nomination> getPendingNominationsByElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        return nominationRepository.findByElectionAndStatus(election, NominationStatus.PENDING);
    }
}