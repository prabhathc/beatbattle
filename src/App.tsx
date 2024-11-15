import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateBattlePage from './pages/CreateBattlePage';
import MyBattlesPage from './pages/MyBattlesPage';
import DashboardPage from './pages/DashboardPage';
import BattleDetailsPage from './pages/BattleDetailsPage';
import SubmitTrackPage from './pages/SubmitTrackPage';
import ActiveLobbiesPage from './pages/ActiveLobbiesPage';

export default function App() {
  return (
    <Auth0Provider
      domain="beatbattle.us.auth0.com"
      clientId="your_client_id"
      authorizationParams={{
        redirect_uri: window.location.origin,
        connection: "discord",
      }}
    >
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/active-lobbies" element={<ActiveLobbiesPage />} />
            <Route path="/create" element={<CreateBattlePage />} />
            <Route path="/my-battles" element={<MyBattlesPage />} />
            <Route path="/dashboard/:id" element={<DashboardPage />} />
            <Route path="/battle/:id" element={<BattleDetailsPage />} />
            <Route path="/battle/:id/submit" element={<SubmitTrackPage />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}