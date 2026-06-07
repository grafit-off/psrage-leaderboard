import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from '../../components/Dashboard/Dashboard';
import MatchesView from '../../features/MatchesView/MatchesView';
import PlayersView from '../../features/PlayersView/PlayersView';
import StatsView from '../../features/StatsView/StatsView';
import { View } from '../../models/View';
import styles from './MainLayout.module.scss';

const VIEW_COMPONENTS: Record<View, React.FC> = {
    leaderboard: Dashboard,
    matches: MatchesView,
    players: PlayersView,
    stats: StatsView,
};

const MainLayout: React.FC = () => {
    const [active, setActive] = useState<View>('leaderboard');
    const ActiveView = VIEW_COMPONENTS[active];

    return (
        <div className={styles.app}>
            <Sidebar active={active} onChangeActive={setActive} />
            <main className={styles.main}>
                <div className={styles.mainInner}>
                    <ActiveView />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
