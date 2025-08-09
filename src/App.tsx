import React from 'react';
import './styles/main.scss';
import { LanguageProvider } from './context/LanguageContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import { useLeaderboard } from './context/LeaderboardContext';
import { useLanguage } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const { state } = useLeaderboard();
  const { t } = useLanguage();

  if (state.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="error-container">
        <p className="error-message">{t('error')}: {state.error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Dashboard players={state.players} />
      </main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <LeaderboardProvider>
        <AppContent />
      </LeaderboardProvider>
    </LanguageProvider>
  );
}

export default App;
