import { graphql, HttpResponse } from 'msw';
import { characterMock, charactersMock } from './mockData';

export const handlers = [
    graphql.query('GetCharacter', () => {
        return HttpResponse.json({
            data: {
                character: characterMock,
            },
        });
    }),

    graphql.query('GetCharacters', () => {
        return HttpResponse.json({
            data: {
                characters: charactersMock,
            },
        });
    }),
];