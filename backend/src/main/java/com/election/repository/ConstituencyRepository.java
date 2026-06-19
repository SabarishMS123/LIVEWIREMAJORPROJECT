package com.election.repository;

import com.election.model.Candidate;
import com.election.model.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConstituencyRepository extends JpaRepository<Constituency, Long> {
	 Optional<Constituency> findByName(String name);
	    
	    Optional<Constituency> findByCode(String code);
	    
	    List<Constituency> findByState(String state);
	    
	    @Query("SELECT c FROM Constituency c WHERE c.name LIKE %:name%")
	    List<Constituency> searchByName(@Param("name") String name);
	    
	    boolean existsByName(String name);
	    
	    boolean existsByCode(String code);
}