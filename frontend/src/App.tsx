// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import Layout from './components/layout/Layout';
// import LandingPage from './pages/LandingPage';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import PartyRegister from './components/party/PartyRegister';
// import VoterDashboard from './components/voter/VoterDashboard';
// import PartyDashboard from './components/party/PartyDashboard';
// import AdminDashboard from './components/admin/AdminDashboard';
// import AddCandidate from './components/party/AddCandidate';
// import CandidateList from './components/party/CandidateList';
// import PartyResults from './components/party/PartyResults';
// import NominationStatus from './components/candidate/NominationStatus';
// import ManageConstituencies from './components/admin/ManageConstituencies';
// import ManageElections from './components/admin/ManageElections';
// import ManageNominations from './components/admin/ManageNominations';
// import ManageParties from './components/admin/ManageParties';
// import ManageVoters from './components/admin/ManageVoters';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Toaster position="top-right" />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register/voter" element={<Register />} />
//           <Route path="/register/party" element={<PartyRegister />} />

//           {/* Voter Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['VOTER', 'ROLE_VOTER']} />}>
//             <Route element={<Layout />}>
//               <Route path="/voter/dashboard" element={<VoterDashboard />} />
//               <Route path="/voter/profile" element={<VoterDashboard />} />
//             </Route>
//           </Route>

//           {/* Party Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['PARTY', 'ROLE_PARTY']} />}>
//             <Route element={<Layout />}>
//               <Route path="/party/dashboard" element={<PartyDashboard />} />
//               <Route path="/party/candidates" element={<CandidateList />} />
//               <Route path="/party/add-candidate" element={<AddCandidate />} />
//               <Route path="/party/nominations" element={<NominationStatus />} />
//               <Route path="/party/results" element={<PartyResults />} />
//             </Route>
//           </Route>

//           {/* Candidate Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['CANDIDATE', 'ROLE_CANDIDATE']} />}>
//             <Route element={<Layout />}>
//               <Route path="/candidate/nominations" element={<NominationStatus />} />
//             </Route>
//           </Route>

//           {/* RO/Admin Routes */}
//           <Route element={<ProtectedRoute allowedRoles={['RO_RETURNING_OFFICER', 'ROLE_RO_RETURNING_OFFICER']} />}>
//             <Route element={<Layout />}>
//               <Route path="/admin/dashboard" element={<AdminDashboard />} />
//               <Route path="/admin/constituencies" element={<ManageConstituencies />} />
//               <Route path="/admin/elections" element={<ManageElections />} />
//               <Route path="/admin/nominations" element={<ManageNominations />} />
//               <Route path="/admin/parties" element={<ManageParties />} />
//               <Route path="/admin/voters" element={<ManageVoters />} />
//               <Route path="/admin/results" element={<ManageElections />} />
//             </Route>
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PartyRegister from './components/party/PartyRegister';
import VoterDashboard from './components/voter/VoterDashboard';
import PartyDashboard from './components/party/PartyDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import CandidateDashboard from './components/candidate/CandidateDashboard';  // ✅ Add this import
import CastVote from './components/voter/CastVote';
import ResultsView from './components/voter/ResultsView';
import AddCandidate from './components/party/AddCandidate';
import CandidateList from './components/party/CandidateList';
import PartyResults from './components/party/PartyResults';
import NominationStatus from './components/candidate/NominationStatus';
import ManageConstituencies from './components/admin/ManageConstituencies';
import ManageElections from './components/admin/ManageElections';
import ManageNominations from './components/admin/ManageNominations';
import ManageParties from './components/admin/ManageParties';
import ManageVoters from './components/admin/ManageVoters';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/voter" element={<Register />} />
          <Route path="/register/party" element={<PartyRegister />} />

          {/* Voter Routes */}
          <Route element={<ProtectedRoute allowedRoles={['VOTER', 'ROLE_VOTER']} />}>
            <Route element={<Layout />}>
              <Route path="/voter/dashboard" element={<VoterDashboard />} />
              <Route path="/voter/cast-vote" element={<CastVote elections={[]} hasVotedStatus={{}} onVoteCast={() => {}} />} />
              <Route path="/voter/results" element={<ResultsView />} />
              <Route path="/voter/profile" element={<VoterDashboard />} />
            </Route>
          </Route>

          {/* Party Routes */}
          <Route element={<ProtectedRoute allowedRoles={['PARTY', 'ROLE_PARTY']} />}>
            <Route element={<Layout />}>
              <Route path="/party/dashboard" element={<PartyDashboard />} />
              <Route path="/party/candidates" element={<CandidateList />} />
              <Route path="/party/add-candidate" element={<AddCandidate />} />
              <Route path="/party/nominations" element={<NominationStatus />} />
              <Route path="/party/results" element={<PartyResults />} />
            </Route>
          </Route>

          {/* ✅ Candidate Routes - ADD THIS */}
          <Route element={<ProtectedRoute allowedRoles={['CANDIDATE', 'ROLE_CANDIDATE']} />}>
            <Route element={<Layout />}>
              <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/nominations" element={<NominationStatus />} />
            </Route>
          </Route>

          {/* Admin/RO Routes */}
          <Route element={<ProtectedRoute allowedRoles={['RO_RETURNING_OFFICER', 'ROLE_RO_RETURNING_OFFICER']} />}>
            <Route element={<Layout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/constituencies" element={<ManageConstituencies />} />
              <Route path="/admin/elections" element={<ManageElections />} />
              <Route path="/admin/nominations" element={<ManageNominations />} />
              <Route path="/admin/parties" element={<ManageParties />} />
              <Route path="/admin/voters" element={<ManageVoters />} />
              <Route path="/admin/results" element={<ManageElections />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;