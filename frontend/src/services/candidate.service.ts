// // // import api from './api';
// // // import { Nomination, ElectionResult, /*Election */} from '../types';

// // // // // export const submitNomination = async (
// // // // //   electionId: number,
// // // // //   manifestoUrl: string,
// // // // //   affidavitUrl: string,
// // // // //   nominationFormUrl: string
// // // // // ): Promise<Nomination> => {
// // // // //   const response = await api.post('/candidate/nominate', {
// // // // //     electionId,
// // // // //     manifestoUrl,
// // // // //     affidavitUrl,
// // // // //     nominationFormUrl
// // // // //   });
// // // // //   return response.data;
// // // // // };
// // // // export const submitNomination = async (
// // // //   electionId: number,
// // // //   manifestoUrl: string,
// // // //   affidavitUrl: string,
// // // //   nominationFormUrl: string
// // // // ): Promise<Nomination> => {
// // // //   const response = await api.post('/candidate/nominate', {
// // // //     electionId,
// // // //     manifestoUrl,
// // // //     affidavitUrl,
// // // //     nominationFormUrl
// // // //   });
// // // //   return response.data;
// // // // };
// // // // export const getMyNominations = async (): Promise<Nomination[]> => {
// // // //   const response = await api.get('/candidate/nominations');
// // // //   return response.data;
// // // // };
// // // // export const getActiveElectionsForCandidate = async (): Promise<unknown[]> => {
// // // //   const response = await api.get('/candidate/elections/active');
// // // //   return response.data;
// // // // };

// // // // export const getCandidateResults = async (electionId: number): Promise<ElectionResult[]> => {
// // // //   const response = await api.get(`/candidate/results?electionId=${electionId}`);
// // // //   return response.data;
// // // // };
// // // // // ✅ UPDATE nomination
// // // // export const updateNomination = async (
// // // //   nominationId: number,
// // // //   manifestoUrl: string,
// // // //   affidavitUrl: string,
// // // //   nominationFormUrl: string
// // // // ): Promise<Nomination> => {
// // // //   const response = await api.put(`/candidate/nominations/${nominationId}`, {
// // // //     manifestoUrl,
// // // //     affidavitUrl,
// // // //     nominationFormUrl
// // // //   });
// // // //   return response.data.nomination;
// // // // };

// // // // // ✅ DELETE nomination
// // // // export const deleteNomination = async (nominationId: number): Promise<void> => {
// // // //   await api.delete(`/candidate/nominations/${nominationId}`);
// // // // };

// // // // // ✅ GET single nomination
// // // // export const getNominationById = async (nominationId: number): Promise<Nomination> => {
// // // //   const response = await api.get(`/candidate/nominations/${nominationId}`);
// // // //   return response.data;
// // // // };

// // // // // Add this function
// // // // export const getCandidatesByElection = async (electionId: number): Promise<Candidate[]> => {
// // // //   const response = await api.get(`/candidate/elections/${electionId}/candidates`);
// // // //   return Array.isArray(response.data) ? response.data : [];
// // // // };

// // // // // ✅ NEW: Get completed elections for candidate
// // // // export const getCompletedElectionsForCandidate = async (): Promise<Election[]> => {
// // // //   const response = await api.get('/candidate/elections/completed');
// // // //   return Array.isArray(response.data) ? response.data : [];
// // // // };

// // // // // ✅ NEW: Get election results
// // // // export const getCandidateElectionResults = async (electionId: number): Promise<ElectionResult[]> => {
// // // //   const response = await api.get(`/candidate/elections/${electionId}/results`);
// // // //   return Array.isArray(response.data) ? response.data : [];
// // // // };

// // // // // ✅ NEW: Get winner
// // // // export const getCandidateWinner = async (electionId: number): Promise<ElectionResult | null> => {
// // // //   const response = await api.get(`/candidate/elections/${electionId}/winner`);
// // // //   return response.data;
// // // // };

// // // // export const getElectionsForNomination = async () => {
// // // //     const response = await api.get('/elections/nomination-open');
// // // //     return response.data;
// // // // };

// // // // src/services/candidate.service.ts

// // // import api from './api.config';

// // // ✅ CHANGE THIS FUNCTION - Rename and update the endpoint
// // // OLD: getActiveElectionsForCandidate
// // // NEW: getElectionsForNomination
// // // export const getElectionsForNomination = async () => {
// // //     const response = await api.get('/elections/nomination-open');
// // //     return response.data;
// // // };

// // // // Keep this for voting phase elections (if needed separately)
// // // export const getActiveElectionsForCandidate = async () => {
// // //     const response = await api.get('/elections/active');
// // //     return response.data;
// // // };

// // // // Keep existing functions
// // // export const getCompletedElectionsForCandidate = async () => {
// // //     const response = await api.get('/elections/completed');
// // //     return response.data;
// // // };

// // // export const getMyNominations = async () => {
// // //     const response = await api.get('/nominations/my');
// // //     return response.data;
// // // };

// // // export const submitNomination = async (
// // //     electionId: number,
// // //     manifestoUrl: string,
// // //     affidavitUrl: string,
// // //     nominationFormUrl: string
// // // ) => {
// // //     const response = await api.post('/nominations/submit', {
// // //         electionId,
// // //         manifestoUrl,
// // //         affidavitUrl,
// // //         nominationFormUrl
// // //     });
// // //     return response.data;
// // // };

// // // export const updateNomination = async (
// // //     nominationId: number,
// // //     manifestoUrl: string,
// // //     affidavitUrl: string,
// // //     nominationFormUrl: string
// // // ) => {
// // //     const response = await api.put(`/nominations/${nominationId}`, {
// // //         manifestoUrl,
// // //         affidavitUrl,
// // //         nominationFormUrl
// // //     });
// // //     return response.data;
// // // };

// // // export const deleteNomination = async (nominationId: number) => {
// // //     const response = await api.delete(`/nominations/${nominationId}`);
// // //     return response.data;
// // // };

// // // export const getCandidateElectionResults = async (electionId: number) => {
// // //     const response = await api.get(`/results/election/${electionId}/candidate`);
// // //     return response.data;
// // // };

// // // export const getCandidateWinner = async (electionId: number) => {
// // //     const response = await api.get(`/results/election/${electionId}/winner`);
// // //     return response.data;
// // // };

// // // src/services/candidate.service.ts

// // import api from './api.config';

// // // Get elections open for nomination (NOMINATION_ONGOING status)
// // export const getElectionsForNomination = async () => {
// //     const response = await api.get('/elections/nomination-open');
// //     return response.data;
// // };

// // // Get active elections in voting phase (ELECTION_ONGOING status)
// // export const getActiveElectionsForCandidate = async () => {
// //     const response = await api.get('/elections/active');
// //     return response.data;
// // };

// // // Get completed elections
// // export const getCompletedElectionsForCandidate = async () => {
// //     const response = await api.get('/elections/completed');
// //     return response.data;
// // };

// // // Get my nominations
// // export const getMyNominations = async () => {
// //     const response = await api.get('/nominations/my');
// //     return response.data;
// // };

// // // Submit a new nomination
// // export const submitNomination = async (
// //     electionId: number,
// //     manifestoUrl: string,
// //     affidavitUrl: string,
// //     nominationFormUrl: string
// // ) => {
// //     const response = await api.post('/nominations/submit', {
// //         electionId,
// //         manifestoUrl,
// //         affidavitUrl,
// //         nominationFormUrl
// //     });
// //     return response.data;
// // };

// // // Update an existing nomination
// // export const updateNomination = async (
// //     nominationId: number,
// //     manifestoUrl: string,
// //     affidavitUrl: string,
// //     nominationFormUrl: string
// // ) => {
// //     const response = await api.put(`/nominations/${nominationId}`, {
// //         manifestoUrl,
// //         affidavitUrl,
// //         nominationFormUrl
// //     });
// //     return response.data;
// // };

// // // Delete a nomination
// // export const deleteNomination = async (nominationId: number) => {
// //     const response = await api.delete(`/nominations/${nominationId}`);
// //     return response.data;
// // };

// // // Get election results for a candidate
// // export const getCandidateElectionResults = async (electionId: number) => {
// //     const response = await api.get(`/results/election/${electionId}/candidate`);
// //     return response.data;
// // };

// // // Get winner of an election
// // export const getCandidateWinner = async (electionId: number) => {
// //     const response = await api.get(`/results/election/${electionId}/winner`);
// //     return response.data;
// // };
// // src/services/candidate.service.ts

// import api from './api';  // Changed from './api.config' to './api'
// import { Nomination, Election, ElectionResult } from '../types';

// // Get elections open for nomination (NOMINATION_ONGOING status)
// export const getElectionsForNomination = async (): Promise<Election[]> => {
//     try {
//         const response = await api.get('/elections/nomination-open');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching nomination-open elections:', error);
//         return [];
//     }
// };

// // Get active elections in voting phase (ELECTION_ONGOING status)
// export const getActiveElectionsForCandidate = async (): Promise<Election[]> => {
//     try {
//         const response = await api.get('/elections/active');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching active elections:', error);
//         return [];
//     }
// };

// // Get completed elections
// export const getCompletedElectionsForCandidate = async (): Promise<Election[]> => {
//     try {
//         const response = await api.get('/elections/completed');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching completed elections:', error);
//         return [];
//     }
// };

// // Get my nominations
// export const getMyNominations = async (): Promise<Nomination[]> => {
//     try {
//         const response = await api.get('/candidate/nominations');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching my nominations:', error);
//         return [];
//     }
// };

// // Submit a new nomination
// export const submitNomination = async (
//     electionId: number,
//     manifestoUrl: string,
//     affidavitUrl: string,
//     nominationFormUrl: string
// ): Promise<Nomination> => {
//     const response = await api.post('/candidate/nominate', {
//         electionId,
//         manifestoUrl,
//         affidavitUrl,
//         nominationFormUrl
//     });
//     return response.data;
// };

// // Update an existing nomination
// export const updateNomination = async (
//     nominationId: number,
//     manifestoUrl: string,
//     affidavitUrl: string,
//     nominationFormUrl: string
// ): Promise<Nomination> => {
//     const response = await api.put(`/candidate/nominations/${nominationId}`, {
//         manifestoUrl,
//         affidavitUrl,
//         nominationFormUrl
//     });
//     return response.data;
// };

// // Delete a nomination
// export const deleteNomination = async (nominationId: number): Promise<void> => {
//     await api.delete(`/candidate/nominations/${nominationId}`);
// };

// // Get election results for a candidate
// export const getCandidateElectionResults = async (electionId: number): Promise<ElectionResult[]> => {
//     const response = await api.get(`/candidate/elections/${electionId}/results`);
//     return response.data;
// };

// // Get winner of an election
// export const getCandidateWinner = async (electionId: number): Promise<ElectionResult | null> => {
//     const response = await api.get(`/candidate/elections/${electionId}/winner`);
//     return response.data;
// };

// src/services/candidate.service.ts

import api from './api';
import { Nomination, Election, ElectionResult, Candidate } from '../types';

// Get elections open for nomination (NOMINATION_ONGOING status)
export const getElectionsForNomination = async (): Promise<Election[]> => {
    try {
        const response = await api.get('/elections/nomination-open');
        return response.data;
    } catch (error) {
        console.error('Error fetching nomination-open elections:', error);
        return [];
    }
};

// Get active elections in voting phase (ELECTION_ONGOING status)
export const getActiveElectionsForCandidate = async (): Promise<Election[]> => {
    try {
        const response = await api.get('/elections/active');
        return response.data;
    } catch (error) {
        console.error('Error fetching active elections:', error);
        return [];
    }
};

// Get completed elections
export const getCompletedElectionsForCandidate = async (): Promise<Election[]> => {
    try {
        const response = await api.get('/elections/completed');
        return response.data;
    } catch (error) {
        console.error('Error fetching completed elections:', error);
        return [];
    }
};

// Get my nominations
export const getMyNominations = async (): Promise<Nomination[]> => {
    try {
        const response = await api.get('/candidate/nominations');
        return response.data;
    } catch (error) {
        console.error('Error fetching my nominations:', error);
        return [];
    }
};

// Submit a new nomination
export const submitNomination = async (
    electionId: number,
    manifestoUrl: string,
    affidavitUrl: string,
    nominationFormUrl: string
): Promise<Nomination> => {
    const response = await api.post('/candidate/nominate', {
        electionId,
        manifestoUrl,
        affidavitUrl,
        nominationFormUrl
    });
    return response.data;
};

// Update an existing nomination
export const updateNomination = async (
    nominationId: number,
    manifestoUrl: string,
    affidavitUrl: string,
    nominationFormUrl: string
): Promise<Nomination> => {
    const response = await api.put(`/candidate/nominations/${nominationId}`, {
        manifestoUrl,
        affidavitUrl,
        nominationFormUrl
    });
    return response.data;
};

// Delete a nomination
export const deleteNomination = async (nominationId: number): Promise<void> => {
    await api.delete(`/candidate/nominations/${nominationId}`);
};

// Get election results for a candidate
export const getCandidateElectionResults = async (electionId: number): Promise<ElectionResult[]> => {
    const response = await api.get(`/candidate/elections/${electionId}/results`);
    return response.data;
};

// Get winner of an election
export const getCandidateWinner = async (electionId: number): Promise<ElectionResult | null> => {
    const response = await api.get(`/candidate/elections/${electionId}/winner`);
    return response.data;
};

// Get candidates by election (for voters to see candidates)
// export const getCandidatesByElection = async (electionId: number): Promise<Candidate[]> => {
//     try {
//         const response = await api.get(`/elections/${electionId}/candidates`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching candidates by election:', error);
//         return [];
//     }
// };
export const getCandidatesByElection = async (electionId: number): Promise<Candidate[]> => {
  const response = await api.get(`/candidate/elections/${electionId}/candidates`);
  return Array.isArray(response.data) ? response.data : [];
};