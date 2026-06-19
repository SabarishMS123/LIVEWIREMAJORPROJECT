// NominationRepository.java
package com.election.repository;

import com.election.model.Nomination;
import com.election.model.Election;
import com.election.model.Candidate;
import com.election.model.NominationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface NominationRepository extends JpaRepository<Nomination, Long> {
    List<Nomination> findByElection(Election election);
    List<Nomination> findByElectionAndStatus(Election election, NominationStatus status);
    Optional<Nomination> findByElectionAndCandidate(Election election, Candidate candidate);
    List<Nomination> findByCandidate(Candidate candidate);
}