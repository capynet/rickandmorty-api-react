import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page Not Found</h2>
                <p className={styles.message}>
                    The dimension you're looking for doesn't exist in this universe.
                </p>
                <Link to="/" className={styles.homeButton}>
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;