// PartyRepository.java
package com.election.repository;

import com.election.model.Party;
import com.election.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    Optional<Party> findByName(String name);
    Optional<Party> findByUser(User user);
    @Query("SELECT p FROM Party p WHERE p.user.id = :userId")
    Optional<Party> findByUserId(@Param("userId") Long userId);
   // Optional<Party> findByUser(User user);  // Keep if needed
    Optional<Party> findByUsername(String username);  // Add this
    Optional<Party> findByEmail(String email);
}