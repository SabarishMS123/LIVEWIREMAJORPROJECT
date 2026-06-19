//// VoterRequest.java - Add validation annotations
//package com.election.dto;
//
//import lombok.Data;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Size;
//
//@Data
//public class VoterRequest {
//    @NotBlank(message = "Voter ID is required")
//    @Size(min = 10, max = 20, message = "Voter ID must be between 10 and 20 characters")
//    private String voterId;
//    
//    @NotBlank(message = "Name is required")
//    private String name;
//    
//    private String fatherName;
//    private String dateOfBirth;
//    private String address;
//    private String city;
//    private String pincode;
//    
//    @NotBlank(message = "Email is required")
//    @Email(message = "Invalid email format")
//    private String email;
//    
//    @NotNull(message = "Constituency ID is required")
//    private Long constituencyId;
//    
//    @NotBlank(message = "Username is required")
//    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
//    private String username;
//    
//    @NotBlank(message = "Password is required")
//    @Size(min = 6, message = "Password must be at least 6 characters")
//    private String password;
//
//	public String getVoterId() {
//		return voterId;
//	}
//
//	public void setVoterId(String voterId) {
//		this.voterId = voterId;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getFatherName() {
//		return fatherName;
//	}
//
//	public void setFatherName(String fatherName) {
//		this.fatherName = fatherName;
//	}
//
//	public String getDateOfBirth() {
//		return dateOfBirth;
//	}
//
//	public void setDateOfBirth(String dateOfBirth) {
//		this.dateOfBirth = dateOfBirth;
//	}
//
//	public String getAddress() {
//		return address;
//	}
//
//	public void setAddress(String address) {
//		this.address = address;
//	}
//
//	public String getCity() {
//		return city;
//	}
//
//	public void setCity(String city) {
//		this.city = city;
//	}
//
//	public String getPincode() {
//		return pincode;
//	}
//
//	public void setPincode(String pincode) {
//		this.pincode = pincode;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public Long getConstituencyId() {
//		return constituencyId;
//	}
//
//	public void setConstituencyId(Long constituencyId) {
//		this.constituencyId = constituencyId;
//	}
//
//	public String getUsername() {
//		return username;
//	}
//
//	public void setUsername(String username) {
//		this.username = username;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//}
package com.election.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class VoterRequest {
    private String voterId;
    private String name;
    private String fatherName;
    private String dateOfBirth;
    private String address;
    private String city;
    private String pincode;
    
    @Email
    @NotBlank
    private String email;
    
    private Long constituencyId;
    private String username;
    private String password;
    
    // Getters and setters - MAKE SURE THESE EXIST
    public String getVoterId() { return voterId; }
    public void setVoterId(String voterId) { this.voterId = voterId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }
    
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Long getConstituencyId() { return constituencyId; }
    public void setConstituencyId(Long constituencyId) { this.constituencyId = constituencyId; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}