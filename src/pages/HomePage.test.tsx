import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import * as useGraphQL from '../hooks/useGraphQL';
import { charactersMock } from '../test/mocks/mockData';

// Mock the useGraphQL hook
vi.mock('../hooks/useGraphQL', () => ({
    useCharacters: vi.fn(),
}));

describe('HomePage Component', () => {
    const mockUseCharacters = useGraphQL.useCharacters as ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock implementation
        mockUseCharacters.mockReturnValue({
            characters: charactersMock.results,
            info: charactersMock.info,
            loading: false,
            error: null,
        });
    });

    it('renders character list and pagination correctly', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        // Check title
        expect(screen.getByText('Rick and Morty Characters')).toBeInTheDocument();

        // Check page info
        expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();

        // Check character cards
        charactersMock.results.forEach((character) => {
            expect(screen.getByText(`${character.name} (${character.status})`)).toBeInTheDocument();
        });

        // Check pagination
        const prevButton = screen.getByText('<');
        const nextButton = screen.getByText('>');
        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeDisabled();
    });

    it('shows loading state', () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            info: null,
            loading: true,
            error: null,
        });

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows error state', () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            info: null,
            loading: false,
            error: { message: 'Test error message' },
        });

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByText('Error: Test error message')).toBeInTheDocument();
    });

    it('handles page navigation correctly', async () => {
        const user = userEvent.setup();

        // Mock for first page
        mockUseCharacters.mockReturnValue({
            characters: charactersMock.results,
            info: {
                ...charactersMock.info,
                pages: 3,
                next: 2,
                prev: null,
            },
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <HomePage />
            </MemoryRouter>
        );

        // Check initial page
        expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();

        // Check pagination buttons
        const prevButton = screen.getByText('<');
        const nextButton = screen.getByText('>');
        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();

        // Mock for second page
        mockUseCharacters.mockImplementation((page) => ({
            characters: charactersMock.results,
            info: {
                ...charactersMock.info,
                pages: 3,
                next: page < 3 ? page + 1 : null,
                prev: page > 1 ? page - 1 : null,
            },
            loading: false,
            error: null,
        }));

        // Navigate to next page
        await user.click(nextButton);

        // Wait for the state to update
        await waitFor(() => {
            expect(mockUseCharacters).toHaveBeenCalledWith(2);
        });
    });
});