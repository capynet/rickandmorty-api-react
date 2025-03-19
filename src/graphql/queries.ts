import { gql } from "urql";

export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int) {
        characters(page: $page) {
            info {
                count
                pages
                next
                prev
            }
            results {
                id
                name
                image
                species
                status
                gender
                origin {
                    name
                    id
                }
            }
        }
    }
`;

export const GET_CHARACTER = gql`
    query Character($id: ID!) {
        character(id: $id) {
            id
            name
            status
            species
            type
            gender
            origin {
                name
            }
            image
            episode {
                id
                name
                air_date
                episode
            }
        }
    }
`;