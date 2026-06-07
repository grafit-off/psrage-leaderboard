import React from 'react';
import styles from './ViewHeader.module.scss';

interface ViewHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  liveLabel?: string;
  liveCount?: number;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ title, subtitle, liveLabel, liveCount }) => {
  const showLivePill = !!liveLabel && typeof liveCount === 'number' && liveCount > 0;

  return (
    <header className={styles.head}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {showLivePill && (
        <span className={styles.live}>
          <i className={styles.liveDot} /> {liveLabel} · {liveCount}
        </span>
      )}
    </header>
  );
};

export default ViewHeader;
