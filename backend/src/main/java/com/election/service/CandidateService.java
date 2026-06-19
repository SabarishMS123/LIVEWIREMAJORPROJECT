// CandidateService.java
package com.election.service;

import com.election.model.Candidate;
import com.election.model.User;
import com.election.model.Role;
import com.election.model.Party;
import com.election.model.Constituency;
import com.election.model.Nomination;
import com.election.repository.CandidateRepository;
import com.election.repository.PartyRepository;
import com.election.repository.ConstituencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private PartyRepository partyRepository;
    
    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    @Autowired
    private AuthService authService;
    @Autowired
    private NominationService nominationService;
    
    public Candidate addCandidate(Candidate candidate, Long partyId, Long constituencyId, 
            String username, String password, String email) {

			// ✅ Validate party exists
			Party party = partyRepository.findById(partyId)
			.orElseThrow(() -> new RuntimeException("Party not found with id: " + partyId));
			
			Constituency constituency = constituencyRepository.findById(constituencyId)
			.orElseThrow(() -> new RuntimeException("Constituency not found with id: " + constituencyId));
			
			User user = authService.registerUser(username, password, email, Role.CANDIDATE);
			
			candidate.setParty(party);
			candidate.setConstituency(constituency);
			candidate.setUser(user);
			
			return candidateRepository.save(candidate);
}
    
    public List<Candidate> getCandidatesByParty(Long partyId) {
        Party party = partyRepository.findById(partyId)
            .orElseThrow(() -> new RuntimeException("Party not found"));
        return candidateRepository.findByParty(party);
    }
    public Candidate getCandidateByUsername(String username) {
        return candidateRepository.findByUser_Username(username)
            .orElseThrow(() -> new RuntimeException("Candidate not found for username: " + username));
    }
    public List<Candidate> getCandidatesByConstituency(Long constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId)
            .orElseThrow(() -> new RuntimeException("Constituency not found"));
        return candidateRepository.findByConstituency(constituency);
    }
    public List<Candidate> getCandidatesByElection(Long electionId) {
        List<Nomination> acceptedNominations = nominationService.getAcceptedNominationsByElection(electionId);
        return acceptedNominations.stream()
            .map(Nomination::getCandidate)
            .collect(Collectors.toList());
    }
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
    
    public Candidate getCandidateByUser(Long userId) {
        return candidateRepository.findByUser_Id(userId)
            .orElseThrow(() -> new RuntimeException("Candidate not found for this user"));
    }
 // CandidateService.java - Add this method
    public Long getCandidateConstituency(String username) {
        // Get candidate by username
        Candidate candidate = candidateRepository.findByUser_Username(username)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
        
        // Return constituency ID
        return candidate.getConstituency() != null ? candidate.getConstituency().getId() : null;
    }
}