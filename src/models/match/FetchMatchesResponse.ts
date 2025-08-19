import { Match } from "./Match";

export interface FetchMatchesResponse {
    end: number;
    start: number;
    items: Match[];
}