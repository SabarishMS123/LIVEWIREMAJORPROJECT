// VotingService.java
package com.election.service;

import com.election.model.*;
import com.election.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VotingService {
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private VoterRepository voterRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private NominationRepository nominationRepository;
    
    public Vote castVote(Vote vote, Long voterId, Long candidateId, Long electionId) {
        Voter voter = voterRepository.findById(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
        
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
        
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        // Check if election is ongoing
        if (election.getStatus() != ElectionStatus.ELECTION_ONGOING) {
            throw new RuntimeException("Voting is not open for this election");
        }
        
        // Check if voter has already voted in this election
        if (voteRepository.findByVoterAndElection(voter, election).isPresent()) {
            throw new RuntimeException("Voter has already cast a vote in this election");
        }
        
        // Check if candidate is accepted for this election
        Nomination nomination = nominationRepository.findByElectionAndCandidate(election, candidate)
            .orElseThrow(() -> new RuntimeException("Candidate is not nominated for this election"));
        
        if (nomination.getStatus() != NominationStatus.ACCEPTED) {
            throw new RuntimeException("Candidate nomination is not accepted for this election");
        }
        
        vote.setVoter(voter);
        vote.setCandidate(candidate);
        vote.setElection(election);
        vote.setTransactionHash(UUID.randomUUID().toString());
        
        // Mark voter as voted
        voter.setHasVoted(true);
        voterRepository.save(voter);
        
        return voteRepository.save(vote);
    }
    
    public boolean hasVoterVoted(Long voterId, Long electionId) {
        Voter voter = voterRepository.findById(voterId)
            .orElseThrow(() -> new RuntimeException("Voter not found"));
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        return voteRepository.findByVoterAndElection(voter, election).isPresent();
    }
    
    public Long getVoteCountForCandidate(Long candidateId, Long electionId) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
        Election election = electionRepository.findById(electionId)
            .orElseThrow(() -> new RuntimeException("Election not found"));
        
        return voteRepository.countByElectionAndCandidate(election, candidate);
    }
}