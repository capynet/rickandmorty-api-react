import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterPage from './CharacterPage';
import * as useGraphQL from '~/src/hooks/useGraphQL';
import { characterMock } from '~/src/test/mocks/mockData';

vi.mock('~/src/hooks/useGraphQL', () => ({
    useCharacter: vi.fn(),
}));

describe('CharacterPage Component', () => {
    const mockUseCharacter = useGraphQL.useCharacter as ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseCharacter.mockReturnValue({
            character: characterMock,
            loading: false,
            error: null,
        });
    });

    it('renders character information and episodes correctly', () => {
        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(characterMock.name)).toBeInTheDocument();
        expect(screen.getByText(characterMock.status)).toBeInTheDocument();

        expect(screen.getByText(`Episodes (${characterMock.episode.length})`)).toBeInTheDocument();

        const firstEpisode = characterMock.episode[0];
        expect(screen.getByText(firstEpisode.name)).toBeInTheDocument();
        expect(screen.getByText(firstEpisode.episode)).toBeInTheDocument();
        expect(screen.getByText(firstEpisode.air_date)).toBeInTheDocument();

        expect(screen.getByText(`Episode 1 of ${characterMock.episode.length}`)).toBeInTheDocument();

        const backButton = screen.getByText('← Back to characters');
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveAttribute('href', '/');
    });

    it('preserves page parameter in back link', () => {
        render(
            <MemoryRouter initialEntries={['/character/1?page=5']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        const backButton = screen.getByText('← Back to characters');
        expect(backButton).toHaveAttribute('href', '/?page=5');
    });

    it('shows loading state', () => {
        mockUseCharacter.mockReturnValue({
            character: null,
            loading: true,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows error state', () => {
        mockUseCharacter.mockReturnValue({
            character: null,
            loading: false,
            error: { message: 'Test error message' },
        });

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Error: Test error message')).toBeInTheDocument();
    });

    it('shows not found state', () => {
        mockUseCharacter.mockReturnValue({
            character: null,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Character not found')).toBeInTheDocument();
    });

    it('allows navigating through episodes', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        const firstEpisode = characterMock.episode[0];
        expect(screen.getByText(firstEpisode.name)).toBeInTheDocument();
        expect(screen.getByText(`Episode 1 of ${characterMock.episode.length}`)).toBeInTheDocument();

        const nextButton = screen.getByText('>');
        await user.click(nextButton);

        const secondEpisode = characterMock.episode[1];
        await waitFor(() => {
            expect(screen.getByText(secondEpisode.name)).toBeInTheDocument();
            expect(screen.getByText(`Episode 2 of ${characterMock.episode.length}`)).toBeInTheDocument();
        });

        const prevButton = screen.getByText('<');
        await user.click(prevButton);

        await waitFor(() => {
            expect(screen.getByText(firstEpisode.name)).toBeInTheDocument();
            expect(screen.getByText(`Episode 1 of ${characterMock.episode.length}`)).toBeInTheDocument();
        });
    });
});