import React from 'react';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainLayout.module.scss';
import Matches from '../../features/Matches/Matches';

const MainLayout: React.FC = () => {
    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.dashboard}>
                    <Dashboard />
                </div>
                <div className={styles.sidebar}>
                    <Sidebar children={<Matches />} />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;



