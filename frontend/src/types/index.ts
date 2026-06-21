export interface User {
  id: number;
  username: string;
  email: string;
  role: 'VOTER' | 'PARTY' | 'CANDIDATE' | 'RO_RETURNING_OFFICER';
  verified: boolean;
}

export interface LoginResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Voter {
  id: number;
  voterId: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  pincode: string;
  email: string;
  constituency: Constituency;
  hasVoted: boolean;
  verified: boolean;
}

export interface Party {
  id: number;
  name: string;
  abbreviation: string;
  symbol: string;
  headquarters: string;
  registrationDate: string;
  approved: boolean;
}

export interface Constituency {
  id: number;
  name: string;
  code: string;
  state: string;
  totalVoters: number;
}

export interface Election {
  id: number;
  name: string;
  description: string;
  constituencyId: number;
  constituencyName: string;
  constituency?: Constituency;
  nominationStartDate: string;
  nominationEndDate: string;
  electionStartDate: string;
  electionEndDate: string;
  status: string;
}

export interface Candidate {
  id: number;
  name: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  party: Party;
  constituency: Constituency;
}

export interface Nomination {
  id: number;
  candidate: Candidate;
  election: Election;
  party: Party;
  manifestoUrl: string;
  affidavitUrl: string;
  nominationFormUrl: string;
  submissionDate?: string;
  reviewedDate?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  rejectionReason?: string;
}

export interface VoteRequest {
  candidateId: number;
  electionId: number;
}

export interface VoterRequest {
  voterId: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  pincode: string;
  email: string;
  constituencyId: number;
  username: string;
  password: string;
}

export interface PartyRequest {
  name: string;
  abbreviation: string;
  symbol: string;
  headquarters: string;
  username: string;
  password: string;
  email: string;
}

export interface CandidateRequest {
  name: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  partyId?: number;
  constituencyId: number;
  username: string;
  password: string;
  email: string;
}

export interface NominationRequest {
  electionId: number;
  manifestoUrl: string;
  affidavitUrl: string;
  nominationFormUrl: string;
}

export interface ElectionRequest {
  name: string;
  description: string;
  constituencyId: number;
  nominationStartDate: string;
  nominationEndDate: string;
  electionStartDate: string;
  electionEndDate: string;
}
export interface ElectionResult {
  id: number;
  candidate: Candidate;
  totalVotes: number;
  votePercentage: number;
  rank: number;
}