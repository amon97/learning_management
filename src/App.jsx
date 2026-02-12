import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultCategories, sampleLogs, sampleGoals, defaultSkills } from './data/initialData';

import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import ProgressPage from './pages/ProgressPage';
import SkillsPage from './pages/SkillsPage';
import GoalsPage from './pages/GoalsPage';

import './App.css';

function AppContent() {
  const [categories, setCategories] = useLocalStorage('ag_categories', defaultCategories);
  const [logs, setLogs] = useLocalStorage('ag_logs', sampleLogs);
  const [goals, setGoals] = useLocalStorage('ag_goals', sampleGoals);
  const [skills, setSkills] = useLocalStorage('ag_skills', defaultSkills);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Sidebar />
              <main className="app-main">
                <Header />
                <div className="app-content">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <DashboardPage
                          logs={logs}
                          categories={categories}
                          goals={goals}
                        />
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        <CategoriesPage
                          categories={categories}
                          setCategories={setCategories}
                          logs={logs}
                        />
                      }
                    />
                    <Route
                      path="/progress"
                      element={
                        <ProgressPage
                          logs={logs}
                          setLogs={setLogs}
                          categories={categories}
                        />
                      }
                    />
                    <Route
                      path="/skills"
                      element={
                        <SkillsPage
                          skills={skills}
                          setSkills={setSkills}
                          categories={categories}
                        />
                      }
                    />
                    <Route
                      path="/goals"
                      element={
                        <GoalsPage
                          goals={goals}
                          setGoals={setGoals}
                          categories={categories}
                        />
                      }
                    />
                  </Routes>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
