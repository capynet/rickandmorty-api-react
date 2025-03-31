import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination Component', () => {
    it('renders pagination controls correctly', () => {
        render(
            <Pagination hasPrevPage={true} hasNextPage={true} onPageChange={vi.fn()} />
        );

        expect(screen.getByText('<')).toBeInTheDocument();
        expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('disables previous button when on first page', () => {
        render(
            <Pagination hasPrevPage={false} hasNextPage={true} onPageChange={vi.fn()} />
        );

        const prevButton = screen.getByText('<');
        expect(prevButton).toBeDisabled();

        const nextButton = screen.getByText('>');
        expect(nextButton).not.toBeDisabled();
    });

    it('disables next button when on last page', () => {
        render(
            <Pagination hasPrevPage={true} hasNextPage={false} onPageChange={vi.fn()} />
        );

        const prevButton = screen.getByText('<');
        expect(prevButton).not.toBeDisabled();

        const nextButton = screen.getByText('>');
        expect(nextButton).toBeDisabled();
    });

    it('calls onPageChange with "prev" when clicking previous button', async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(
            <Pagination hasPrevPage={true} hasNextPage={true} onPageChange={onPageChange} />
        );

        await user.click(screen.getByText('<'));
        expect(onPageChange).toHaveBeenCalledWith('prev');
    });

    it('calls onPageChange with "next" when clicking next button', async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(
            <Pagination hasPrevPage={true} hasNextPage={true} onPageChange={onPageChange} />
        );

        await user.click(screen.getByText('>'));
        expect(onPageChange).toHaveBeenCalledWith('next');
    });
});