package com.election.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String fatherName;
    private String motherName;
    private String dateOfBirth;
    private String address;
    private String documentUrl; // G-Drive link for documents
    
    @ManyToOne
    @JoinColumn(name = "party_id")
    @JsonIgnoreProperties("candidates")  // ✅ Prevent circular reference with Party
    private Party party;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore  // ✅ Ignore User to prevent circular reference
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "constituency_id")
    @JsonIgnoreProperties("candidates")  // ✅ Prevent circular reference with Constituency
    private Constituency constituency;
    
    @OneToMany(mappedBy = "candidate")
    @JsonIgnore  // ✅ Ignore nominations list
    private List<Nomination> nominations;
    
    @OneToMany(mappedBy = "candidate")
    @JsonIgnore  // ✅ Ignore election results list
    private List<ElectionResult> results;
    
    private LocalDateTime registrationDate;
    private boolean active = true;
    
    @PrePersist
    protected void onCreate() {
        registrationDate = LocalDateTime.now();
    }

    // Getters and Setters
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

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Constituency getConstituency() {
        return constituency;
    }

    public void setConstituency(Constituency constituency) {
        this.constituency = constituency;
    }

    public List<Nomination> getNominations() {
        return nominations;
    }

    public void setNominations(List<Nomination> nominations) {
        this.nominations = nominations;
    }

    public List<ElectionResult> getResults() {
        return results;
    }

    public void setResults(List<ElectionResult> results) {
        this.results = results;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}