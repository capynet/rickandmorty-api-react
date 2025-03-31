import styles from './Pagination.module.css';

interface PaginationProps {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    onPageChange: (direction: 'prev' | 'next') => void;
}

export default function Pagination({hasPrevPage, hasNextPage, onPageChange}: PaginationProps) {
    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange('prev')}
                disabled={!hasPrevPage}
            >
                &lt;
            </button>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange('next')}
                disabled={!hasNextPage}
            >
                &gt;
            </button>
        </div>
    );
}