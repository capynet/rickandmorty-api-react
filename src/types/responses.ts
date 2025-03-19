import {Character} from "./character";

export interface PageInfo {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
}

export interface CharactersResponse {
    characters: {
        info: PageInfo;
        results: Character[];
    };
}

export interface CharacterResponse {
    character: Character;
}