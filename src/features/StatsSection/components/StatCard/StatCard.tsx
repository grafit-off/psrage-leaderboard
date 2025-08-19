import React from 'react';
import { Player } from '../../../../models/player/Player';
import styles from './StatCard.module.scss';
import Skeleton from '../../../../components/Skeleton/Skeleton';

interface StatCardProps {
  title: string;
  player: Player | null;
  value: string | number;
  subtitle?: string;
  icon?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, player, value, subtitle, icon, loading }) => {
  const isLoaded = player && !loading;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.content}>
        {isLoaded ? (
          <>
            <div>
              <a
                href={`https://www.faceit.com/en/players/${player.nickname}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.playerLink}
              >
                <span className={styles.playerNickname}>{player.nickname}</span>
              </a>
            </div>
            <div className={styles.value}>{value}</div>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </>
        ) : <>
          <div>
            <a
              rel="noopener noreferrer"
              className={styles.playerLink}
            >
              <span className={styles.playerNickname}><Skeleton lines={1} width='50%' /></span>
            </a>
          </div>
          <div className={styles.value}><Skeleton lines={1} width='75%' /></div>
          <div className={styles.subtitle}><Skeleton lines={1} width='60%' /></div>
        </>}
      </div>
    </div>
  );
};

export default StatCard;


