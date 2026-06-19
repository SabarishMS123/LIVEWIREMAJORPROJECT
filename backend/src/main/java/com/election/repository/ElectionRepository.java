////// ElectionRepository.java
////package com.election.repository;
////
////import com.election.model.Election;
////import com.election.model.ElectionStatus;
////import com.election.model.Constituency;
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.stereotype.Repository;
////import java.time.LocalDateTime;
////import java.util.List;
////
////@Repository
////public interface ElectionRepository extends JpaRepository<Election, Long> {
////    List<Election> findByConstituency(Constituency constituency);
////    List<Election> findByStatus(ElectionStatus status);
////    List<Election> findByElectionStartDateBeforeAndElectionEndDateAfter(LocalDateTime now, LocalDateTime now2);
////    
////}
//package com.election.repository;
//
//import com.election.model.Election;
//import com.election.model.ElectionStatus;
//import com.election.model.Constituency;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public interface ElectionRepository extends JpaRepository<Election, Long> {
//    
//    List<Election> findByConstituency(Constituency constituency);
//    List<Election> findByStatus(ElectionStatus status);
//    
//    // ✅ Search by name (case insensitive)
//    List<Election> findByNameContainingIgnoreCase(String name);
//    
//    // ✅ Search by constituency name
//    @Query("SELECT e FROM Election e WHERE LOWER(e.constituency.name) LIKE LOWER(CONCAT('%', :constituencyName, '%'))")
//    List<Election> findByConstituencyNameContainingIgnoreCase(@Param("constituencyName") String constituencyName);
//    
//    // ✅ Search by date range
//    List<Election> findByElectionStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
//    
//    // ✅ Advanced search with multiple criteria
//    @Query("SELECT e FROM Election e WHERE " +
//           "(:name IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
//           "(:constituencyId IS NULL OR e.constituency.id = :constituencyId) AND " +
//           "(:status IS NULL OR e.status = :status)")
//    List<Election> searchElections(@Param("name") String name,
//                                   @Param("constituencyId") Long constituencyId,
//                                   @Param("status") ElectionStatus status);
//    
//    List<Election> findByElectionStartDateBeforeAndElectionEndDateAfter(LocalDateTime now, LocalDateTime now2);
////    @Query("SELECT e FROM Election e WHERE e.constituency = :constituency AND e.status IN :statuses")
////    List<Election> findByConstituencyAndStatusIn(
////        @Param("constituency") Constituency constituency,
////        @Param("statuses") List<ElectionStatus> statuses
////    );
//    
//    List<Election> findByConstituencyAndStatus(Constituency constituency, ElectionStatus status);
//    
// // NEW: Get elections open for nomination (status = NOMINATION_ONGOING)
//
// // Add this method to ElectionRepository.java
//
//    @Query("SELECT e FROM Election e WHERE e.constituency = :constituency AND e.status IN :statuses")
//    List<Election> findByConstituencyAndStatusIn(
//        @Param("constituency") Constituency constituency,
//        @Param("statuses") List<ElectionStatus> statuses
//    );
//    
//    //List<Election> findByConstituencyAndStatus(Constituency constituency, ElectionStatus status);
//    
//    
//}

package com.election.repository;

import com.election.model.Election;
import com.election.model.ElectionStatus;
import com.election.model.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
    
    // Basic finders
    List<Election> findByConstituency(Constituency constituency);
    List<Election> findByStatus(ElectionStatus status);
    
    // Search by constituency ID and status (FIXED - this was missing)
    List<Election> findByConstituencyIdAndStatus(Long constituencyId, ElectionStatus status);
    
    // Search by name (case insensitive)
    List<Election> findByNameContainingIgnoreCase(String name);
    
    // Search by constituency name
    @Query("SELECT e FROM Election e WHERE LOWER(e.constituency.name) LIKE LOWER(CONCAT('%', :constituencyName, '%'))")
    List<Election> findByConstituencyNameContainingIgnoreCase(@Param("constituencyName") String constituencyName);
    
    // Search by date range
    List<Election> findByElectionStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Advanced search with multiple criteria
    @Query("SELECT e FROM Election e WHERE " +
           "(:name IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:constituencyId IS NULL OR e.constituency.id = :constituencyId) AND " +
           "(:status IS NULL OR e.status = :status)")
    List<Election> searchElections(@Param("name") String name,
                                   @Param("constituencyId") Long constituencyId,
                                   @Param("status") ElectionStatus status);
    
    // Find elections by date range (voting period)
    List<Election> findByElectionStartDateBeforeAndElectionEndDateAfter(LocalDateTime now, LocalDateTime now2);
    
    // Find by constituency AND status
    List<Election> findByConstituencyAndStatus(Constituency constituency, ElectionStatus status);
    
    // Find by constituency AND multiple statuses
    @Query("SELECT e FROM Election e WHERE e.constituency = :constituency AND e.status IN :statuses")
    List<Election> findByConstituencyAndStatusIn(
        @Param("constituency") Constituency constituency,
        @Param("statuses") List<ElectionStatus> statuses
    );
    
    // Optional: Get elections open for nomination (by date as well)
    @Query("SELECT e FROM Election e WHERE e.status = 'NOMINATION_ONGOING' AND e.nominationEndDate > :now")
    List<Election> findOpenForNomination(@Param("now") LocalDateTime now);
    
    // Optional: Get ongoing elections (voting phase)
    @Query("SELECT e FROM Election e WHERE e.status = 'ELECTION_ONGOING' AND e.electionEndDate > :now")
    List<Election> findOngoingElections(@Param("now") LocalDateTime now);
}