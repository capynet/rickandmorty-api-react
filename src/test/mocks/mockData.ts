export const characterMock = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
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
};

export const charactersMock = {
    info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
    },
    results: [
        characterMock,
        {
            id: '2',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [
                {
                    id: '1',
                    name: 'Pilot',
                    air_date: 'December 2, 2013',
                    episode: 'S01E01',
                },
            ],
        },
    ],
};