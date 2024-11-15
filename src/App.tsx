import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateBattlePage from "./pages/CreateBattlePage";
import MyBattlesPage from "./pages/MyBattlesPage";
import DashboardPage from "./pages/DashboardPage";
import BattleDetailsPage from "./pages/BattleDetailsPage";
import SubmitTrackPage from "./pages/SubmitTrackPage";
import ActiveLobbiesPage from "./pages/ActiveLobbiesPage";

export default function App() {
  return (
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
  );
}
