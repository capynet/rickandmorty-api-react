import {Link, useSearchParams} from 'react-router-dom';
import styles from './CharacterCard.module.css';
import {type Character as CharacterSchema} from "../types/character";

interface Props {
    character: CharacterSchema;
}

export default function Character({character}: Props) {
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page");

    const characterLink = currentPage
        ? `/character/${character.id}?page=${currentPage}`
        : `/character/${character.id}`;

    return (
        <Link to={characterLink} className={styles.cardLink}>
            <div className={styles.characterCard}>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.image}
                        src={character.image || ''}
                        alt={character.name || ''}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{character.name} ({character.status})</h3>
                    <p className={styles.status}>Gender: {character.gender}</p>
                    <p className={styles.status}>Origin: {character.origin?.name}</p>
                </div>
            </div>
        </Link>
    );
}