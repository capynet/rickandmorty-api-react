import styles from "./EpisodeCard.module.css";
import {CharacterQuery} from "~/src/generated/graphql";

type EpisodeCardProps = {
    episode: NonNullable<NonNullable<CharacterQuery['character']>['episode']>[number];
};

const EpisodeCard = ({episode}: EpisodeCardProps) => (
    <div className={styles.episodeCard}>
        <h3 className={styles.episodeName}>{episode.name}</h3>
        <p className={styles.episodeCode}>{episode.episode}</p>
        <p className={styles.episodeDate}>{episode.air_date}</p>
    </div>
);

export default EpisodeCard;