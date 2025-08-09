import { Player, FaceitApiResponse } from '../models/Player';
import { formatPlayerStats } from '../functions/formatPlayerStats';

const API_KEY = 'd0d492ad-df77-4356-a153-fc2cc8cd2ff4';
const API_URL = 'https://open.faceit.com/data/v4/hubs/3b814eda-51a7-497b-8efd-18d039e8db49/stats?limit=100';

export const fetchLeaderboardData = async (): Promise<Player[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: FaceitApiResponse = await response.json();
    
    // Format the raw data to typed data
    const formattedPlayers: Player[] = rawData.players.map(player => ({
      player_id: player.player_id,
      nickname: player.nickname,
      stats: formatPlayerStats(player.stats),
    }));

    return formattedPlayers;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};
