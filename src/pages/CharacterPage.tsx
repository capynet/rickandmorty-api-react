import {useState} from 'react';
import {useParams, Link, useSearchParams} from 'react-router-dom';
import Pagination from '../components/Pagination';
import {useCharacter} from '../hooks/useGraphQL';
import styles from './CharacterPage.module.css';

const CharacterPage = () => {
    const {id} = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page");
    const [episodeIndex, setEpisodeIndex] = useState(0);

    const {character, loading, error} = useCharacter(id || '');

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    if (!character) return <div className={styles.notFound}>Character not found</div>;

    const sortedEpisodes = character.episode ? [...character.episode].sort((a, b) => {
        return new Date(a.air_date || '').getTime() - new Date(b.air_date || '').getTime();
    }) : [];

    const currentEpisode = sortedEpisodes[episodeIndex];

    const handleEpisodeChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && episodeIndex > 0) {
            setEpisodeIndex(episodeIndex - 1);
        } else if (direction === 'next' && episodeIndex < sortedEpisodes.length - 1) {
            setEpisodeIndex(episodeIndex + 1);
        }
    };

    return (
        <div className={styles.container}>
            <Link
                to={currentPage ? `/?page=${currentPage}` : "/"}
                className={styles.backButton}
            >
                &larr; Back to characters
            </Link>

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

            <div className={styles.episodesSection}>
                <h2 className={styles.episodesTitle}>Episodes ({sortedEpisodes.length})</h2>

                {currentEpisode && (
                    <div className={styles.episodeCard}>
                        <h3 className={styles.episodeName}>{currentEpisode.name}</h3>
                        <p className={styles.episodeCode}>{currentEpisode.episode}</p>
                        <p className={styles.episodeDate}>{currentEpisode.air_date}</p>
                    </div>
                )}

                <Pagination
                    hasPrevPage={episodeIndex > 0}
                    hasNextPage={episodeIndex < sortedEpisodes.length - 1}
                    onPageChange={handleEpisodeChange}
                />

                <div className={styles.pageInfo}>
                    Episode {episodeIndex + 1} of {sortedEpisodes.length}
                </div>
            </div>
        </div>
    );
};

export default CharacterPage;