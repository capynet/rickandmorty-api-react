import styles from "./CharacterInfo.module.css";
import {CharacterQuery} from "../../../../generated/graphql";

type CharacterInfoProps = {
    character: NonNullable<CharacterQuery['character']>;
};

const CharacterInfo = ({character}: CharacterInfoProps) => (
    <div className={styles.characterInfo}>
        <div className={styles.imageContainer}>
            <img
                src={character.image || ''}
                alt={character.name || ''}
                className={styles.characterImage}
            />
        </div>

        <div className={styles.details}>
            <h1 className={styles.name}>{character.name}</h1>

            <div className={styles.basicInfo}>
                <div className={styles.infoItem}>
                    <span className={styles.label}>Status:</span>
                    <span className={styles.value}>{character.status}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Species:</span>
                    <span className={styles.value}>{character.species}</span>
                </div>

                {character.type && (
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Type:</span>
                        <span className={styles.value}>{character.type}</span>
                    </div>
                )}

                <div className={styles.infoItem}>
                    <span className={styles.label}>Gender:</span>
                    <span className={styles.value}>{character.gender}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>Origin:</span>
                    <span className={styles.value}>{character.origin?.name}</span>
                </div>
            </div>
        </div>
    </div>
);

export default CharacterInfo;