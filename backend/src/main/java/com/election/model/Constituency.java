// Constituency.java
package com.election.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "constituencies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Constituency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String code;
    private String state;
    private Integer totalVoters;
    
    @OneToMany(mappedBy = "constituency", cascade = CascadeType.ALL)
    @JsonManagedReference  // ✅ Manages serialization
    @JsonIgnore
    private List<Election> elections = new ArrayList<>();
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getTotalVoters() {
		return totalVoters;
	}

	public void setTotalVoters(Integer totalVoters) {
		this.totalVoters = totalVoters;
	}

	public List<Election> getElections() {
		return elections;
	}

	public void setElections(List<Election> elections) {
		this.elections = elections;
	}

	
}