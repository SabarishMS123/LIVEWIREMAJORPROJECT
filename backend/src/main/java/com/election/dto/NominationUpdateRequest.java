package com.election.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class NominationUpdateRequest {
    
    private String manifestoUrl;
    private String affidavitUrl;
    private String nominationFormUrl;
    
    public String getManifestoUrl() { return manifestoUrl; }
    public void setManifestoUrl(String manifestoUrl) { this.manifestoUrl = manifestoUrl; }
    
    public String getAffidavitUrl() { return affidavitUrl; }
    public void setAffidavitUrl(String affidavitUrl) { this.affidavitUrl = affidavitUrl; }
    
    public String getNominationFormUrl() { return nominationFormUrl; }
    public void setNominationFormUrl(String nominationFormUrl) { this.nominationFormUrl = nominationFormUrl; }
}