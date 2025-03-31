import {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import Character from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import {useCharacters} from "../hooks/useGraphQL";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialPage = parseInt(searchParams.get("page") || "1");
    const [page, setPage] = useState(initialPage < 1 ? 1 : initialPage);
    const {characters, info, loading, error} = useCharacters(page);

    useEffect(() => {
        if (!loading && info) {
            if (page < 1) {
                setPage(1);
                setSearchParams({});
                return;
            }

            if (page > info.pages) {
                navigate("/not-found", { replace: true });
            }
        }
    }, [info, loading, page, navigate, setSearchParams]);

    useEffect(() => {
        if (page > 1) {
            setSearchParams({page: page.toString()});
        } else {
            setSearchParams({});
        }
    }, [page, setSearchParams]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    const handlePageChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && info?.prev) {
            setPage(page - 1);
        } else if (direction === 'next' && info?.next) {
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Rick and Morty Characters</h1>

            {info && (
                <div className={styles.pageInfo}>
                    Page {page} of {info.pages}
                </div>
            )}

            <div className={styles.charactersGrid}>
                {characters.map(character =>
                        character && (
                            <div key={character.id as string} className={styles.characterItem}>
                                <Character character={character}/>
                            </div>
                        )
                )}
            </div>

            <Pagination
                hasPrevPage={!!info?.prev}
                hasNextPage={!!info?.next}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default HomePage;