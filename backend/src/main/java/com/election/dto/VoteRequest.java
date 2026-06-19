// VoteRequest.java
package com.election.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class VoteRequest {
    @NotNull
    private Long candidateId;
    
    @NotNull
    private Long electionId;

	public Long getCandidateId() {
		return candidateId;
	}

	public void setCandidateId(Long candidateId) {
		this.candidateId = candidateId;
	}

	public Long getElectionId() {
		return electionId;
	}

	public void setElectionId(Long electionId) {
		this.electionId = electionId;
	}


}