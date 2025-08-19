
export interface VoteLocation {
    entities: LocationEntity[];
    pick: string[];
}

export interface VoteMap {
    entities: MapEntity[];
    pick: string[];
}

export interface LocationEntity {
    game_location_id: string;
    guid: string;
    image_lg: string;
    image_sm: string;
    name: string;
    class_name: string;
}

export interface MapEntity {
    game_map_id: string;
    guid: string;
    image_lg: string;
    image_sm: string;
    name: string;
    class_name: string;
}

export interface Voting {
    voted_entity_types: string[];
    location: VoteLocation;
    map: VoteMap;
}
