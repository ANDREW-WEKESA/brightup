import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomNotesPage from './pages/CustomNotesPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom" element={<CustomNotesPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
