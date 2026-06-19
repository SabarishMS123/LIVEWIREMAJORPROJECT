package com.election.dto;

import java.time.LocalDateTime;

import com.election.model.Election;

public class ElectionResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Long constituencyId;  // Only ID, not full object
    private String constituencyName;
    private LocalDateTime nominationStartDate;
    private LocalDateTime nominationEndDate;
    private LocalDateTime electionStartDate;
    private LocalDateTime electionEndDate;
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

	public Long getConstituencyId() {
		return constituencyId;
	}

	public void setConstituencyId(Long constituencyId) {
		this.constituencyId = constituencyId;
	}

	public String getConstituencyName() {
		return constituencyName;
	}

	public void setConstituencyName(String constituencyName) {
		this.constituencyName = constituencyName;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	private String status;
    
    // Constructor
    public ElectionResponseDTO(Election election) {
        this.id = election.getId();
        this.name = election.getName();
        this.description = election.getDescription();
        this.constituencyId = election.getConstituency().getId();
        this.constituencyName = election.getConstituency().getName();
        this.nominationStartDate = election.getNominationStartDate();
        this.nominationEndDate = election.getNominationEndDate();
        this.electionStartDate = election.getElectionStartDate();
        this.electionEndDate = election.getElectionEndDate();
        this.status = election.getStatus().name();
    }
    
    // Getters...
}