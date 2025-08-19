import { Player, FaceitApiResponse } from '../../../models/player/Player';
import { formatPlayerStats } from '../../../functions/formatPlayerStats';
import { FACEIT_API_HUB_ID, FACEIT_API_URL } from '../const/base';
import api from '..';

const API_URL = `${FACEIT_API_URL}/data/v4/hubs/${FACEIT_API_HUB_ID}/stats`;

export const fetchHubLeaderboardData = async (limit = 100): Promise<Player[]> => {
    try {
        const response = await api.get<FaceitApiResponse>(API_URL, {
            params: { limit },
        });

        const formattedPlayers: Player[] = response.data.players.map(player => ({
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
