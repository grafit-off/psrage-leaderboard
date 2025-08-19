import { LanguageProvider } from './context/LanguageContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import MainLayout from './layouts/MainLayout/MainLayout';
import './styles/main.scss';

function App() {
  return (
    <LanguageProvider>
      <LeaderboardProvider>
        <MainLayout/>
      </LeaderboardProvider>
    </LanguageProvider>
  );
}

export default App;
