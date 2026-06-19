// ElectionService.java
package com.election.service;

import com.election.model.Election;
import com.election.model.ElectionStatus;
import com.election.model.Constituency;
import com.election.repository.ElectionRepository;

import jakarta.transaction.Transactional;

import com.election.repository.ConstituencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ElectionService {
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    public Election scheduleElection(Election election) {
        election.setStatus(ElectionStatus.DRAFT);
        return electionRepository.save(election);
    }
    
    public Election updateElection(Long id, Election electionDetails) {
        Election election = electionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        election.setName(electionDetails.getName());
        election.setDescription(electionDetails.getDescription());
        election.setNominationStartDate(electionDetails.getNominationStartDate());
        election.setNominationEndDate(electionDetails.getNominationEndDate());
        election.setElectionStartDate(electionDetails.getElectionStartDate());
        election.setElectionEndDate(electionDetails.getElectionEndDate());
        
        return electionRepository.save(election);
    }
    
    public void startNomination(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        if (LocalDateTime.now().isBefore(election.getNominationStartDate())) {
            throw new RuntimeException("Nomination cannot start before the scheduled start date");
        }
        
        election.setStatus(ElectionStatus.NOMINATION_ONGOING);
        electionRepository.save(election);
    }
    
    public void endNomination(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        election.setStatus(ElectionStatus.NOMINATION_CLOSED);
        electionRepository.save(election);
    }
    
    public void startElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        if (LocalDateTime.now().isBefore(election.getElectionStartDate())) {
            throw new RuntimeException("Election cannot start before the scheduled start date");
        }
        
        election.setStatus(ElectionStatus.ELECTION_ONGOING);
        electionRepository.save(election);
    }
    
    public void endElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        election.setStatus(ElectionStatus.COMPLETED);
        electionRepository.save(election);
    }
    
    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }
    
    public Election getElectionById(Long id) {
        return electionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Election not found"));
    }
    
    public List<Election> getElectionsByConstituency(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        return electionRepository.findByConstituency(constituency);
    }
    @Transactional
    public void deleteElection(Long id) {
        Election election = electionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Election not found with id: " + id));
        
        // Check if election is ongoing
        if (election.getStatus() == ElectionStatus.ELECTION_ONGOING) {
            throw new RuntimeException("Cannot delete an ongoing election");
        }
        
        electionRepository.delete(election);
    }
    public List<Election> searchElections(String name, Long constituencyId, String status) {
        ElectionStatus electionStatus = null;
        if (status != null && !status.isEmpty()) {
            try {
                electionStatus = ElectionStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                // Invalid status, ignore
            }
        }
        return electionRepository.searchElections(name, constituencyId, electionStatus);
    }
    
    // ✅ SEARCH Elections by name
    public List<Election> searchElectionsByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return electionRepository.findAll();
        }
        return electionRepository.findByNameContainingIgnoreCase(name.trim());
    }
    
    // ✅ SEARCH Elections by constituency ID
    public List<Election> searchElectionsByConstituencyId(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        return electionRepository.findByConstituency(constituency);
    }
    
    // ✅ SEARCH Elections by status
    public List<Election> searchElectionsByStatus(ElectionStatus status) {
        return electionRepository.findByStatus(status);
    }
    public List<Election> getCompletedElections() {
        return electionRepository.findByStatus(ElectionStatus.COMPLETED);
    }
    // ✅ SEARCH Elections by date range
    public List<Election> searchElectionsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return electionRepository.findByElectionStartDateBetween(startDate, endDate);
    }
    public List<Election> getActiveElectionsForConstituency(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        
        LocalDateTime now = LocalDateTime.now();
        
        // Get elections that are in ELECTION_ONGOING status
        return electionRepository.findByConstituencyAndStatus(
            constituency, 
            ElectionStatus.ELECTION_ONGOING
        );
    }
    public List<Election> getCompletedElectionsForConstituency(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        return electionRepository.findByConstituencyAndStatus(constituency, ElectionStatus.COMPLETED);
    }
}