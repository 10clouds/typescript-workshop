import {buildUrl} from '../utils/urls';

export interface CoverData {
    height: number;
    width: number;
    url: string;
}

export interface AlbumData {
    name: string;
    album_type: string;
    images: CoverData[];
}

export interface ArtistData {
    name: string;
}

export interface TrackData {
    id: string;
    name: string;
    preview_url: string;
    album: AlbumData;
    artists: ArtistData[];
}

export interface SearchData {
    tracks: {
        items: TrackData[];
        next: string;
        previous: string;
    };
}

export enum Direction {
    Next = 1,
    Previous = -1,
}

export class SpotifyTrackSearch {
    static readonly baseUrl = `https://api.spotify.com/v1/search`;
    
    nextUrl?: string;
    previousUrl?: string;

    async search(query: string, direction?: Direction) {
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
                limit: 24,
            });
        }

        const response = await fetch(url);
        const data: SearchData = await response.json();
        
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
