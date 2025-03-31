import {useQuery} from "urql";
import {GET_CHARACTERS, GET_CHARACTER} from "~/src/graphql/queries";
import {CharacterQuery, CharacterQueryVariables, GetCharactersQuery, GetCharactersQueryVariables} from "../generated/graphql";

export function useCharacters(page: number) {
    const [result] = useQuery<GetCharactersQuery, GetCharactersQueryVariables>({
        query: GET_CHARACTERS,
        variables: {page},
    });

    const {data, fetching, error} = result;

    return {
        characters: data?.characters?.results || [],
        info: data?.characters?.info,
        loading: fetching,
        error
    };
}

export function useCharacter(id: string) {
    const [result] = useQuery<CharacterQuery, CharacterQueryVariables>({
        query: GET_CHARACTER,
        variables: {id},
    });

    const {data, fetching, error} = result;

    return {
        character: data?.character,
        loading: fetching,
        error
    };
}