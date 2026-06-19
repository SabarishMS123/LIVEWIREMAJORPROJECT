// ElectionRequest.java
package com.election.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class ElectionRequest {
    @NotBlank
    private String name;
    
    private String description;
    
    @NotNull
    private Long constituencyId;
    
    @NotNull
    private LocalDateTime nominationStartDate;
    
    @NotNull
    private LocalDateTime nominationEndDate;
    
    @NotNull
    private LocalDateTime electionStartDate;
    
    @NotNull
    private LocalDateTime electionEndDate;

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

	
}