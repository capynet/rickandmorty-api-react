
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EpisodeCard from './EpisodeCard';
import { characterMock } from '~/src/test/mocks/mockData';

describe('EpisodeCard Component', () => {
    it('renders episode information correctly', () => {
        const episode = characterMock.episode[0];

        render(<EpisodeCard episode={episode} />);

        expect(screen.getByText(episode.name)).toBeInTheDocument();
        expect(screen.getByText(episode.episode)).toBeInTheDocument();
        expect(screen.getByText(episode.air_date)).toBeInTheDocument();
    });
});