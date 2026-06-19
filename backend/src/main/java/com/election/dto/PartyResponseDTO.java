package com.election.dto;



import java.time.LocalDateTime;

import com.election.model.Party;

public class PartyResponseDTO {
    private Long id;
    private String name;
    private String abbreviation;
    private String symbol;
    private String headquarters;
    private LocalDateTime registrationDate;
    private boolean approved;
    private String message;
    
    // Constructor
    public PartyResponseDTO(Party party) {
        this.id = party.getId();
        this.name = party.getName();
        this.abbreviation = party.getAbbreviation();
        this.symbol = party.getSymbol();
        this.headquarters = party.getHeadquarters();
        this.registrationDate = party.getRegistrationDate();
        this.approved = party.isApproved();
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getAbbreviation() { return abbreviation; }
    public void setAbbreviation(String abbreviation) { this.abbreviation = abbreviation; }
    
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    
    public String getHeadquarters() { return headquarters; }
    public void setHeadquarters(String headquarters) { this.headquarters = headquarters; }
    
    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }
    
    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}