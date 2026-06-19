package com.election.repository;

import com.election.model.Voter;
import com.election.model.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface VoterRepository extends JpaRepository<Voter, Long> {
    Optional<Voter> findByVoterId(String voterId);
    Optional<Voter> findByEmail(String email);
    Optional<Voter> findByUser_Id(Long userId);
    
    @Query("SELECT COUNT(v) FROM Voter v WHERE v.constituency = :constituency")
    long countByConstituency(@Param("constituency") Constituency constituency);
    
    boolean existsByVoterId(String voterId);
    boolean existsByEmail(String email);
    Optional<Voter> findByUser_Username(String username);
    List<Voter> findByConstituency(Constituency constituency);
    List<Voter> findByVerified(boolean verified);
    @Query("SELECT v FROM Voter v WHERE " +
            "LOWER(v.voterId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.constituency.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
     List<Voter> searchByKeyword(@Param("keyword") String keyword);
	//List<Voter> findByConstituencyId(Long constituencyId);
	@Query("SELECT v FROM Voter v WHERE " +
		       "v.constituency.id = :constituencyId AND (" +
		       "LOWER(v.voterId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
		       "LOWER(v.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
		       "LOWER(v.email) LIKE LOWER(CONCAT('%', :keyword, '%')))")
		List<Voter> searchByKeywordAndConstituency(@Param("keyword") String keyword, @Param("constituencyId") Long constituencyId);
	@Query("SELECT v FROM Voter v WHERE v.constituency.id = :constituencyId")
    List<Voter> findByConstituencyId(@Param("constituencyId") Long constituencyId);
}