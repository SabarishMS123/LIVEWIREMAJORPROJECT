// VoteRepository.java
package com.election.repository;

import com.election.model.Vote;
import com.election.model.Election;
import com.election.model.Candidate;
import com.election.model.Voter;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByVoterAndElection(Voter voter, Election election);
    Long countByElectionAndCandidate(Election election, Candidate candidate);
    List<Vote> findByElection(Election election);
    List<Vote> findByCandidate(Candidate candidate);
    List<Vote> findByVoter(Voter voter);
 // ✅ DELETE all votes
    @Modifying
    @Transactional
    @Query("DELETE FROM Vote v")
    int deleteAllVotes();
    
    // ✅ DELETE votes by voter
    @Modifying
    @Transactional
    @Query("DELETE FROM Vote v WHERE v.voter = :voter")
    int deleteByVoter(@Param("voter") Voter voter);

}