// import api from './api';
// import { Party, Candidate, Nomination, ElectionResult, CandidateRequest, PartyRequest } from '../types';

// export const registerParty = async (partyData: PartyRequest): Promise<Party> => {
//   const response = await api.post('/party/register', partyData);
//   return response.data;
// };

// export const updateParty = async (partyData: Partial<Party>): Promise<Party> => {
//   const response = await api.put('/party/update', partyData);
//   return response.data;
// };

// export const addCandidate = async (candidateData: CandidateRequest): Promise<Candidate> => {
//   const response = await api.post('/party/candidates', candidateData);
//   return response.data;
// };

// export const getPartyCandidates = async (): Promise<Candidate[]> => {
//   const response = await api.get('/party/candidates');
//   return response.data;
// };

// export const submitNomination = async (electionId: number, manifestoUrl: string, affidavitUrl: string, nominationFormUrl: string): Promise<Nomination> => {
//   const response = await api.post('/candidate/nominate', {
//     electionId,
//     manifestoUrl,
//     affidavitUrl,
//     nominationFormUrl
//   });
//   return response.data;
// };

// export const getMyNominations = async (): Promise<Nomination[]> => {
//   const response = await api.get('/candidate/nominations');
//   return response.data;
// };

// export const getPartyResults = async (electionId: number): Promise<ElectionResult[]> => {
//   const response = await api.get(`/party/results?electionId=${electionId}`);
//   return response.data;
// };

// export const getWinner = async (electionId: number): Promise<ElectionResult> => {
//   const response = await api.get(`/party/elections/${electionId}/winner`);
//   return response.data;
// };
// export const getPartyElections = async (): Promise<Election[]> => {
//   const response = await api.get('/party/elections');
//   return response.data;
// };

// // ✅ NEW: Get completed elections only
// export const getCompletedElections = async (): Promise<Election[]> => {
//   const response = await api.get('/party/elections/completed');
//   return response.data;
// };

import api from './api';
import { Party, Candidate, Nomination, ElectionResult, CandidateRequest, PartyRequest, Election } from '../types';

export const registerParty = async (partyData: PartyRequest): Promise<Party> => {
  const response = await api.post('/party/register', partyData);
  return response.data;
};

export const updateParty = async (partyData: Partial<Party>): Promise<Party> => {
  const response = await api.put('/party/update', partyData);
  return response.data;
};

export const addCandidate = async (candidateData: CandidateRequest): Promise<Candidate> => {
  const response = await api.post('/party/candidates', candidateData);
  return response.data;
};

export const getPartyCandidates = async (): Promise<Candidate[]> => {
  const response = await api.get('/party/candidates');
  return response.data;
};

export const submitNomination = async (electionId: number, manifestoUrl: string, affidavitUrl: string, nominationFormUrl: string): Promise<Nomination> => {
  const response = await api.post('/candidate/nominate', {
    electionId,
    manifestoUrl,
    affidavitUrl,
    nominationFormUrl
  });
  return response.data;
};

export const getMyNominations = async (): Promise<Nomination[]> => {
  const response = await api.get('/candidate/nominations');
  return response.data;
};

export const getPartyResults = async (electionId: number): Promise<ElectionResult[]> => {
  const response = await api.get(`/party/results?electionId=${electionId}`);
  return response.data;
};

export const getWinner = async (electionId: number): Promise<ElectionResult> => {
  const response = await api.get(`/party/elections/${electionId}/winner`);
  return response.data;
};

export const getPartyElections = async (): Promise<Election[]> => {
  const response = await api.get('/party/elections');
  return response.data;
};

export const getCompletedElections = async (): Promise<Election[]> => {
  const response = await api.get('/party/elections/completed');
  return response.data;
};