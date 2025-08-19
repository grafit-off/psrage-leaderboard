import { MatchDetailedResult } from "./MatchDetailedResults";
import { MatchResults } from "./MatchResults";
import { Voting } from "./MatchVoting";
import { Team } from "./Team";

export interface Match {
    match_id: string;
    version: number;
    game: string;
    region: string;
    competition_id: string;
    competition_type: string;
    competition_name: string;
    organizer_id: string;
    teams: {
        faction1: Team;
        faction2: Team;
    };
    voting: Voting;
    calculate_elo: boolean;
    configured_at: number;
    started_at: number;
    finished_at: number;
    demo_url: string[];
    chat_room_id: string;
    best_of: number;
    results: MatchResults;
    detailed_results: MatchDetailedResult[];
    status: string;
    faceit_url: string;
}