import {buildUrl} from '../utils/urls';
import {SpotifyTrackResults} from '../../types/spotifySearchResults';

export enum Direction {
    Next = 1,
    Previous = -1,
}

export class SpotifyTrackSearch {
    static readonly baseUrl = `https://api.spotify.com/v1/search`;
    
    nextUrl: string | null = null;
    previousUrl: string | null = null;

    async search(query: string, direction?: Direction): Promise<SpotifyTrackResults> {
        let url: string;

        if (direction) {
            const directionUrl = this.paginationUrl(direction);

            if (!directionUrl) {
                throw new Error(
                    'SpotifySearch: No direction url to query. ' +
                    'You must call search without direction for the first time.'
                );
            }

            url = directionUrl;
        } else {
            url = buildUrl(SpotifyTrackSearch.baseUrl, {
                q: query,
                type: 'track',
                limit: 12,
            });
        }

        const response = await fetch(url);
        const data: SpotifyTrackResults = await response.json();
        
        this.nextUrl = data.tracks.next;
        this.previousUrl = data.tracks.previous;

        return data;
    }

    hasDirection(direction: Direction): boolean {
        return !!this.paginationUrl(direction);
    }

    private paginationUrl(direction: Direction) {
        switch (direction) {
            case Direction.Next:
                return this.nextUrl;
            case Direction.Previous:
                return this.previousUrl;
        }
    }
}
