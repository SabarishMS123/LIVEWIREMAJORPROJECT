// Election.java
package com.election.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "elections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Election {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "constituency_id")
    @JsonIgnoreProperties("elections") 
    private Constituency constituency;
    
    private LocalDateTime nominationStartDate;
    private LocalDateTime nominationEndDate;
    private LocalDateTime electionStartDate;
    private LocalDateTime electionEndDate;
    
    @Enumerated(EnumType.STRING)
    private ElectionStatus status = ElectionStatus.DRAFT;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "election")
    @JsonIgnore
    private List<Nomination> nominations = new ArrayList<>();
    
    @OneToMany(mappedBy = "election")
    @JsonIgnore
    private List<Vote> votes = new ArrayList<>();
    
    @OneToMany(mappedBy = "election")
    @JsonIgnore
    private List<ElectionResult> results = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Constituency getConstituency() {
		return constituency;
	}

	public void setConstituency(Constituency constituency) {
		this.constituency = constituency;
	}

	public LocalDateTime getNominationStartDate() {
		return nominationStartDate;
	}

	public void setNominationStartDate(LocalDateTime nominationStartDate) {
		this.nominationStartDate = nominationStartDate;
	}

	public LocalDateTime getNominationEndDate() {
		return nominationEndDate;
	}

	public void setNominationEndDate(LocalDateTime nominationEndDate) {
		this.nominationEndDate = nominationEndDate;
	}

	public LocalDateTime getElectionStartDate() {
		return electionStartDate;
	}

	public void setElectionStartDate(LocalDateTime electionStartDate) {
		this.electionStartDate = electionStartDate;
	}

	public LocalDateTime getElectionEndDate() {
		return electionEndDate;
	}

	public void setElectionEndDate(LocalDateTime electionEndDate) {
		this.electionEndDate = electionEndDate;
	}

	public ElectionStatus getStatus() {
		return status;
	}

	public void setStatus(ElectionStatus status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Nomination> getNominations() {
		return nominations;
	}

	public void setNominations(List<Nomination> nominations) {
		this.nominations = nominations;
	}

	public List<Vote> getVotes() {
		return votes;
	}

	public void setVotes(List<Vote> votes) {
		this.votes = votes;
	}

	public List<ElectionResult> getResults() {
		return results;
	}

	public void setResults(List<ElectionResult> results) {
		this.results = results;
	}

	
}

