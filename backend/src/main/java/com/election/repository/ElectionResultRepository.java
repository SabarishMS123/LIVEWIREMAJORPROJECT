package com.election.repository;

import com.election.model.ElectionResult;
import com.election.model.Election;
import com.election.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ElectionResultRepository extends JpaRepository<ElectionResult, Long> {
    List<ElectionResult> findByElection(Election election);
    Optional<ElectionResult> findByElectionAndCandidate(Election election, Candidate candidate);
    List<ElectionResult> findByElectionOrderByRankAsc(Election election);
    void deleteByElection(Election election);
}