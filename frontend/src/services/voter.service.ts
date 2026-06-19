import api from './api';
import { Voter, VoterRequest, Election, ElectionResult, Candidate } from '../types';

export const registerVoter = async (voterData: VoterRequest): Promise<Voter> => {
  const response = await api.post('/voter/register', voterData);
  return response.data;
};

export const castVote = async (candidateId: number, electionId: number): Promise<void> => {
  await api.post('/voter/cast-vote', { candidateId, electionId });
};

export const hasVoted = async (electionId: number): Promise<boolean> => {
  const response = await api.get(`/voter/has-voted?electionId=${electionId}`);
  return response.data;
};

export const getActiveElections = async (): Promise<Election[]> => {
  try {
    const response = await api.get('/voter/elections/active');
    
    // ✅ Handle both array and string responses
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      // If backend returns a string (like the error message), return empty array
      console.warn('Backend returned non-array response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch active elections:', error);
    return [];
  }
};

export const getVoterProfile = async (): Promise<Voter> => {
  const response = await api.get('/voter/profile');
  return response.data;
};

export const updateVoterProfile = async (voterData: Partial<Voter>): Promise<Voter> => {
  const response = await api.put('/voter/profile', voterData);
  return response.data;
};
export const getElectionResults = async (electionId: number): Promise<ElectionResult[]> => {
  try {
    const response = await api.get(`/voter/elections/${electionId}/results`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch election results:', error);
    return [];
  }
};

// ✅ UPDATE: Get winner using voter endpoint
export const getWinner = async (electionId: number): Promise<ElectionResult | null> => {
  try {
    const response = await api.get(`/voter/elections/${electionId}/winner`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch winner:', error);
    return null;
  }
};

// ✅ UPDATE: Get completed elections using voter endpoint
export const getCompletedElections = async (): Promise<Election[]> => {
  try {
    const response = await api.get('/voter/elections/completed');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch completed elections:', error);
    return [];
  }
};
export const getCandidatesForElection = async (electionId: number): Promise<Candidate[]> => {
  const response = await api.get(`/voter/elections/${electionId}/candidates`);
  return Array.isArray(response.data) ? response.data : [];
};
