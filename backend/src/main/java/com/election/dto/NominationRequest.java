// NominationRequest.java
package com.election.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class NominationRequest {
//    @NotNull
//    private Long candidateId;
    
    @NotNull
    private Long electionId;
    
    private String manifestoUrl; // G-Drive link
    private String affidavitUrl; // G-Drive link
    private String nominationFormUrl; // G-Drive link
//	public Long getCandidateId() {
//		return candidateId;
//	}
//	public void setCandidateId(Long candidateId) {
//		this.candidateId = candidateId;
//	}
	public Long getElectionId() {
		return electionId;
	}
	public void setElectionId(Long electionId) {
		this.electionId = electionId;
	}
	public String getManifestoUrl() {
		return manifestoUrl;
	}
	public void setManifestoUrl(String manifestoUrl) {
		this.manifestoUrl = manifestoUrl;
	}
	public String getAffidavitUrl() {
		return affidavitUrl;
	}
	public void setAffidavitUrl(String affidavitUrl) {
		this.affidavitUrl = affidavitUrl;
	}
	public String getNominationFormUrl() {
		return nominationFormUrl;
	}
	public void setNominationFormUrl(String nominationFormUrl) {
		this.nominationFormUrl = nominationFormUrl;
	}
	
}