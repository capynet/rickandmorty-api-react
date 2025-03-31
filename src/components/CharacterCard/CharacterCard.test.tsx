import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { characterMock } from '~/src/test/mocks/mockData';

describe('CharacterCard Component', () => {
    it('renders character information correctly', () => {
        render(
            <MemoryRouter>
                <CharacterCard character={characterMock} />
            </MemoryRouter>
        );

        expect(screen.getByText(`${characterMock.name} (${characterMock.status})`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${characterMock.gender}`)).toBeInTheDocument();
        expect(screen.getByText(`Origin: ${characterMock.origin.name}`)).toBeInTheDocument();

        const image = screen.getByAltText(characterMock.name) as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toContain(characterMock.image);
    });

    it('creates correct link with page parameter when "page" is present', () => {
        render(
            <MemoryRouter initialEntries={['/?page=5']}>
                <CharacterCard character={characterMock} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/character/${characterMock.id}?page=5`);
    });

    it('creates correct link without page parameter when page is not present', () => {
        render(
            <MemoryRouter>
                <CharacterCard character={characterMock} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/character/${characterMock.id}`);
    });
});