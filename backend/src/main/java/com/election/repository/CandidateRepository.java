// CandidateRepository.java
package com.election.repository;

import com.election.model.Candidate;
import com.election.model.Constituency;
import com.election.model.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByParty(Party party);
    List<Candidate> findByConstituency(Constituency constituency);
    Optional<Candidate> findByUser_Id(Long userId);
    Optional<Candidate> findByUser_Username(String username);
}