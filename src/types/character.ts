import { Location } from './location';
import { Episode } from './episode';

export interface Character {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    status?: string | null;
    species?: string | null;
    type?: string | null;
    gender?: string | null;
    origin?: Location | null;
    episode?: Episode[] | null;
}