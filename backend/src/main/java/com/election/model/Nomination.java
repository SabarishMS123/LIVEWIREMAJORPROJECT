// Nomination.java
package com.election.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "nominations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nomination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
    
    @ManyToOne
    @JoinColumn(name = "election_id")
    @JsonIgnoreProperties("nominations")
    private Election election;
    
    @ManyToOne
    @JoinColumn(name = "party_id")
    private Party party;
    
    private String manifestoUrl; // G-Drive link
    private String affidavitUrl; // G-Drive link
    private String nominationFormUrl; // G-Drive link
    
    @Enumerated(EnumType.STRING)
    private NominationStatus status = NominationStatus.PENDING;
    
    private String rejectionReason;
    private LocalDateTime submissionDate;
    private LocalDateTime reviewedDate;
    
    @PrePersist
    protected void onCreate() {
        submissionDate = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public Election getElection() {
		return election;
	}

	public void setElection(Election election) {
		this.election = election;
	}

	public Party getParty() {
		return party;
	}

	public void setParty(Party party) {
		this.party = party;
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

	public NominationStatus getStatus() {
		return status;
	}

	public void setStatus(NominationStatus status) {
		this.status = status;
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public LocalDateTime getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDateTime submissionDate) {
		this.submissionDate = submissionDate;
	}

	public LocalDateTime getReviewedDate() {
		return reviewedDate;
	}

	public void setReviewedDate(LocalDateTime reviewedDate) {
		this.reviewedDate = reviewedDate;
	}

	
}

