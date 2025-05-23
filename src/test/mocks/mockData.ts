import { CharacterQuery, GetCharactersQuery } from "../../generated/graphql";

export const characterMock = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
        name: 'Earth (C-137)',
        id: null,
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
        {
            id: '1',
            name: 'Pilot',
            air_date: 'December 2, 2013',
            episode: 'S01E01',
        },
        {
            id: '2',
            name: 'Lawnmower Dog',
            air_date: 'December 9, 2013',
            episode: 'S01E02',
        },
    ],
} as CharacterQuery['character'];

export const charactersMock: GetCharactersQuery['characters'] = {
    info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
    },
    results: [
        characterMock as any,
        {
            id: '2',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
                name: 'Earth (C-137)',
                id: null,
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [
                {
                    id: '1',
                    name: 'Pilot',
                    air_date: 'December 2, 2013',
                    episode: 'S01E01',
                },
            ],
        } as any,
    ],
};