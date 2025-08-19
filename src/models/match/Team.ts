
export interface Team {
    faction_id: string;
    leader: string;
    avatar: string;
    roster: Player[];
    substituted: boolean;
    name: string;
    type: string;
}

export interface Player {
    player_id: string;
    nickname: string;
    avatar: string;
    membership: string;
    game_player_id: string;
    game_player_name: string;
    game_skill_level: number;
    anticheat_required: boolean;
}