import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomNotesPage from './pages/CustomNotesPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import ProgressPage from './pages/ProgressPage';
import WorldsPage from './pages/WorldsPage';
import WorldMapPage from './pages/WorldMapPage';
import WordLevelPage from './pages/WordLevelPage';
import LevelCompletePage from './pages/LevelCompletePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom" element={<CustomNotesPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        
        {/* Level-based Word Discovery Mode */}
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/world-map" element={<WorldMapPage />} />
        <Route path="/word-level" element={<WordLevelPage />} />
        <Route path="/level-complete" element={<LevelCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
