import {buildUrl} from '../utils/urls';

export const BASE_URL = 'https://api.spotify.com/v1';

export interface TrackData {
    id: string;
    name: string;
    preview_url: string;
}

export interface SearchData {
    tracks: {
        items: TrackData[];
    };
}

export async function search(query: string) {
    const url = buildUrl(`${BASE_URL}/search`, {
        q: query,
        type: 'track',
        limit: 10,
    });

    const response = await fetch(url);
    const data: SearchData = await response.json();
    return data;
}
