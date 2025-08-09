import { PlayerStats, PlayerStatsResponse } from './PlayerStats';

export interface PlayerResponse {
  player_id: string;
  nickname: string;
  stats: PlayerStatsResponse;
}

export interface Player {
  player_id: string;
  nickname: string;
  stats: PlayerStats;
}

export interface FaceitApiResponse {
  game_id: string;
  players: PlayerResponse[];
}
