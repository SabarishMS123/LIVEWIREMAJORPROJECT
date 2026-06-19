// ResultService.java
package com.election.service;

import com.election.model.*;
import com.election.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResultService {
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private ElectionResultRepository electionResultRepository;
    
    @Autowired
    private NominationRepository nominationRepository;
    
    public List<ElectionResult> computeElectionResults(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        if (election.getStatus() != ElectionStatus.COMPLETED) {
            throw new RuntimeException("Election is not completed yet");
        }
        
        // Get all accepted nominations for this election
        List<Nomination> acceptedNominations = nominationRepository.findByElectionAndStatus(election, NominationStatus.ACCEPTED);
        
        // Calculate votes for each candidate
        List<ElectionResult> results = new ArrayList<>();
        
        for (Nomination nomination : acceptedNominations) {
            Candidate candidate = nomination.getCandidate();
            Long voteCount = voteRepository.countByElectionAndCandidate(election, candidate);
            
            ElectionResult result = new ElectionResult();
            result.setElection(election);
            result.setCandidate(candidate);
            result.setTotalVotes(voteCount);
            
            results.add(result);
        }
        
        // Calculate vote percentages and ranks
        Long totalVotes = results.stream().mapToLong(ElectionResult::getTotalVotes).sum();
        
        for (ElectionResult result : results) {
            if (totalVotes > 0) {
                int percentage = (int) ((result.getTotalVotes() * 100.0) / totalVotes);
                result.setVotePercentage(percentage);
            } else {
                result.setVotePercentage(0);
            }
        }
        
        // Sort by votes and assign ranks
        results.sort((r1, r2) -> Long.compare(r2.getTotalVotes(), r1.getTotalVotes()));
        
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setRank(i + 1);
        }
        
        // Save results
        electionResultRepository.saveAll(results);
        
        return results;
    }
    
    public List<ElectionResult> getElectionResults(Long electionId) {
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        return electionResultRepository.findByElection(election);
    }
    
    public ElectionResult getWinningCandidate(Long electionId) {
        List<ElectionResult> results = getElectionResults(electionId);
        
        if (results.isEmpty()) {
            throw new RuntimeException("No results found for this election");
        }
        
        return results.stream()
            .filter(r -> r.getRank() == 1)
            .findFirst()
            .orElseThrow(() -> new RuntimeException("No winning candidate found"));
    }
}