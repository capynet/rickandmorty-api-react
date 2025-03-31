import {useState, useMemo, useCallback} from 'react';
import {useParams, Link, useSearchParams} from 'react-router-dom';
import styles from './CharacterPage.module.css';
import {useCharacter} from "../../hooks/useGraphQL";
import Pagination from "../../components/Pagination";
import CharacterInfo from "./components/CharacterInfo/CharacterInfo";
import EpisodeCard from "./components/EpisodeCard/EpisodeCard";

const CharacterPage = () => {
    const {id} = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page");
    const [episodeIndex, setEpisodeIndex] = useState(0);

    const {character, loading, error} = useCharacter(id || '');

    const sortedEpisodes = useMemo(() => {
        if (!character?.episode) return [];

        return [...character.episode].sort((a, b) => {
            const dateA = a.air_date ? new Date(a.air_date).getTime() : 0;
            const dateB = b.air_date ? new Date(b.air_date).getTime() : 0;
            return dateA - dateB;
        });
    }, [character?.episode]);

    const currentEpisode = useMemo(() =>
            sortedEpisodes[episodeIndex],
        [sortedEpisodes, episodeIndex]
    );

    const handleEpisodeChange = useCallback((direction: 'prev' | 'next') => {
        setEpisodeIndex(prevIndex => {
            if (direction === 'prev' && prevIndex > 0) {
                return prevIndex - 1;
            } else if (direction === 'next' && prevIndex < sortedEpisodes.length - 1) {
                return prevIndex + 1;
            }
            return prevIndex;
        });
    }, [sortedEpisodes.length]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;
    if (!character) return <div className={styles.notFound}>Character not found</div>;

    const hasPrevPage = episodeIndex > 0;
    const hasNextPage = episodeIndex < sortedEpisodes.length - 1;

    return (
        <div className={styles.container}>
            <Link
                to={currentPage ? `/?page=${currentPage}` : "/"}
                className={styles.backButton}
            >
                &larr; Back to characters
            </Link>

            <CharacterInfo character={character}/>

            <div className={styles.episodesSection}>
                <h2 className={styles.episodesTitle}>Episodes ({sortedEpisodes.length})</h2>

                {currentEpisode && <EpisodeCard episode={currentEpisode}/>}

                <Pagination
                    hasPrevPage={hasPrevPage}
                    hasNextPage={hasNextPage}
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