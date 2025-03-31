import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterInfo from './CharacterInfo';
import { characterMock } from '~/src/test/mocks/mockData';

describe('CharacterInfo Component', () => {
    it('renders character information correctly', () => {
        render(<CharacterInfo character={characterMock} />);

        expect(screen.getByText(characterMock.name)).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText(characterMock.status)).toBeInTheDocument();
        expect(screen.getByText('Species:')).toBeInTheDocument();
        expect(screen.getByText(characterMock.species)).toBeInTheDocument();
        expect(screen.getByText('Gender:')).toBeInTheDocument();
        expect(screen.getByText(characterMock.gender)).toBeInTheDocument();
        expect(screen.getByText('Origin:')).toBeInTheDocument();
        expect(screen.getByText(characterMock.origin.name)).toBeInTheDocument();

        const image = screen.getByAltText(characterMock.name) as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toContain(characterMock.image);
    });

    it('conditionally renders type information when present', () => {
        const characterWithType = {
            ...characterMock,
            type: 'Test Type'
        };

        render(<CharacterInfo character={characterWithType} />);

        expect(screen.getByText('Type:')).toBeInTheDocument();
        expect(screen.getByText('Test Type')).toBeInTheDocument();
    });

    it('does not render type information when absent', () => {
        render(<CharacterInfo character={characterMock} />);

        expect(screen.queryByText('Type:')).not.toBeInTheDocument();
    });
});