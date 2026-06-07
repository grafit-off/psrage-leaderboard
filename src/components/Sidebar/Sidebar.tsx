import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { View, VIEWS } from '../../models/View';
import { classNames } from '../../functions/classNames';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  active: View;
  onChangeActive: (view: View) => void;
}

const formatTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const Sidebar: React.FC<SidebarProps> = ({ active, onChangeActive }) => {
  const { language, setLanguage, t } = useLanguage();
  const { state, fetchData } = useLeaderboard();
  const [synced, setSynced] = useState(() => formatTime(new Date()));
  const wasLoading = useRef(false);

  useEffect(() => {
    if (wasLoading.current && !state.loading) {
      setSynced(formatTime(new Date()));
    }
    wasLoading.current = state.loading;
  }, [state.loading]);

  const handleSync = () => {
    if (state.loading) return;
    fetchData();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.wordmark}>
          PSRAGE<span>hub</span>
        </div>
        <div className={styles.hubId}>{t('app.hub')} · 3B81</div>
      </div>

      <nav className={styles.nav}>
        {VIEWS.map((view) => (
          <button
            key={view}
            className={classNames(styles.navButton, active === view && styles.navButtonActive)}
            onClick={() => onChangeActive(view)}
            aria-current={active === view ? 'page' : undefined}
          >
            <span className={styles.navDot} />
            {t(`nav.${view}`)}
          </button>
        ))}
      </nav>

      <div className={styles.foot}>
        <div className={styles.langToggle} role="group" aria-label={t('app.language')}>
          <button
            className={classNames(styles.langButton, language === 'en' && styles.langButtonActive)}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            className={classNames(styles.langButton, language === 'uk' && styles.langButtonActive)}
            onClick={() => setLanguage('uk')}
            aria-pressed={language === 'uk'}
          >
            UA
          </button>
        </div>

        <button
          className={classNames(styles.sync, state.loading && styles.syncSpinning)}
          onClick={handleSync}
          disabled={state.loading}
        >
          <span className={styles.syncIcon}>↻</span>
          {state.loading ? `${t('app.sync')}…` : t('app.sync')}
          <span className={styles.syncWhen}>{t('app.synced')} {synced}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
