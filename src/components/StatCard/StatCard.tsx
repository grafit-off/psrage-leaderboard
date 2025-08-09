import React from 'react';
import { Player } from '../../models/Player';
import styles from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  player: Player | null;
  value: string | number;
  subtitle?: string;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, player, value, subtitle, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.content}>
        {player ? (
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
        ) : (
          <div className={styles.noData}>No data available</div>
        )}
      </div>
    </div>
  );
};

export default StatCard;


