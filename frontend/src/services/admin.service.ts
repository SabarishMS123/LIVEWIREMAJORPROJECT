import api from './api';
import { Constituency, Election, ElectionRequest, Nomination, Party, Voter, ElectionResult } from '../types';

// Constituency Management
export const createConstituency = async (constituency: Partial<Constituency>): Promise<Constituency> => {
  const response = await api.post('/ro/constituencies', constituency);
  return response.data;
};

export const updateConstituency = async (id: number, constituency: Partial<Constituency>): Promise<Constituency> => {
  const response = await api.put(`/ro/constituencies/${id}`, constituency);
  return response.data;
};

export const getAllConstituencies = async (): Promise<Constituency[]> => {
  const response = await api.get('/ro/constituencies');
  return response.data;
};

export const deleteConstituency = async (id: number): Promise<void> => {
  await api.delete(`/ro/constituencies/${id}`);
};

// Election Management
export const scheduleElection = async (election: ElectionRequest): Promise<Election> => {
  const response = await api.post('/ro/elections', election);
  return response.data;
};

export const getAllElections = async (): Promise<Election[]> => {
  const response = await api.get('/ro/elections');
  return response.data;
};

export const startNomination = async (electionId: number): Promise<void> => {
  await api.put(`/ro/elections/${electionId}/start-nomination`);
};

export const endNomination = async (electionId: number): Promise<void> => {
  await api.put(`/ro/elections/${electionId}/end-nomination`);
};

export const startElection = async (electionId: number): Promise<void> => {
  await api.put(`/ro/elections/${electionId}/start-election`);
};

export const endElection = async (electionId: number): Promise<void> => {
  await api.put(`/ro/elections/${electionId}/end-election`);
};

// Nomination Management
export const getAllNominations = async (electionId: number): Promise<Nomination[]> => {
  const response = await api.get(`/ro/nominations?electionId=${electionId}`);
  return response.data;
};

export const getPendingNominations = async (electionId: number): Promise<Nomination[]> => {
  const response = await api.get(`/ro/nominations/pending?electionId=${electionId}`);
  return response.data;
};

export const acceptNomination = async (nominationId: number): Promise<Nomination> => {
  const response = await api.put(`/ro/nominations/${nominationId}/accept`);
  return response.data;
};

export const rejectNomination = async (nominationId: number, reason: string): Promise<Nomination> => {
  const response = await api.put(`/ro/nominations/${nominationId}/reject?reason=${reason}`);
  return response.data;
};

// Party Management
export const getAllParties = async (): Promise<Party[]> => {
  const response = await api.get('/ro/parties');
  return response.data;
};


export const approveParty = async (partyId: number): Promise<void> => {
  await api.put(`/ro/parties/${partyId}/approve`);
};

// Voter Management
export const getAllVoters = async (): Promise<Voter[]> => {
  const response = await api.get('/ro/voters');
  return response.data;
};

export const verifyVoter = async (voterId: number): Promise<Voter> => {
  const response = await api.put(`/ro/voters/${voterId}/verify`);
  return response.data;
};

export const getVotersByConstituency = async (constituencyId: number): Promise<Voter[]> => {
  const response = await api.get(`/ro/voters/constituency/${constituencyId}`);
  return response.data;
};
// ✅ UPDATE Voter
export const updateVoter = async (
  id: number,
  voterData: Partial<Omit<Voter, 'constituency'>> & { constituencyId?: number }
): Promise<Voter> => {
  const response = await api.put(`/ro/voters/${id}`, voterData);
  return response.data;
};

// ✅ DELETE Voter
export const deleteVoter = async (id: number): Promise<void> => {
  await api.delete(`/ro/voters/${id}`);
};

// ✅ GET Single Voter
export const getVoterById = async (id: number): Promise<Voter> => {
  const response = await api.get(`/ro/voters/${id}`);
  return response.data;
};
export const forceDeleteConstituency = async (id: number): Promise<void> => {
  await api.delete(`/ro/constituencies/${id}/force`);
};
// ✅ SEARCH Voters
export const searchVoters = async (keyword: string): Promise<Voter[]> => {
  const response = await api.get(`/ro/voters/search?keyword=${keyword}`);
  return response.data;
};

// ✅ SEARCH Voters by Constituency ID
export const searchVotersByConstituencyAndKeyword = async (constituencyId: number, keyword: string): Promise<Voter[]> => {
  const response = await api.get(`/ro/voters/search?constituencyId=${constituencyId}&keyword=${keyword}`);
  return response.data;
};
// Results
export const computeResults = async (electionId: number): Promise<ElectionResult[]> => {
  const response = await api.post(`/ro/elections/${electionId}/compute-results`);
  return response.data;
};

export const getElectionResults = async (electionId: number): Promise<ElectionResult[]> => {
  const response = await api.get(`/ro/elections/${electionId}/results`);
  return response.data;
};

export const getWinner = async (electionId: number): Promise<ElectionResult> => {
  const response = await api.get(`/ro/elections/${electionId}/winner`);
  return response.data;
};

export const deleteAllVoters = async (): Promise<void> => {
  await api.delete('/ro/voters/all');
};

// ✅ DELETE VOTERS BY CONSTITUENCY
export const deleteVotersByConstituency = async (constituencyId: number): Promise<void> => {
  await api.delete(`/ro/voters/constituency/${constituencyId}`);
};

// ✅ DELETE VOTERS BY STATUS
export const deleteVotersByStatus = async (verified: boolean): Promise<void> => {
  await api.delete(`/ro/voters/status/${verified}`);
};