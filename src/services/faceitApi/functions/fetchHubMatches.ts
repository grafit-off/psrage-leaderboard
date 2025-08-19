import api from '..';
import { FetchMatchesResponse } from '../../../models/match/FetchMatchesResponse';
import { Match } from '../../../models/match/Match';
import { MatchType } from '../../../models/match/MatchType';
import { FACEIT_API_HUB_ID, FACEIT_API_URL } from '../const/base';

const API_URL = `${FACEIT_API_URL}/data/v4/hubs/${FACEIT_API_HUB_ID}/matches`;

export const fetchHubMatches = async (type: MatchType = 'all', limit = 20): Promise<Match[]> => {
    try {
        const response = await api.get<FetchMatchesResponse>(API_URL, {
            params: { 
                limit,
                type
             },
        });

        return response.data.items;
    } catch (error) {
        console.error('Error fetching matches data:', error);
        throw error;
    }
};
 