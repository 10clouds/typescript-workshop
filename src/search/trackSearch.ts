import {buildUrl} from '../utils/urls';

const baseUrl = `https://api.spotify.com/v1/search`;

export class TrackSearch {
  nextUrl;
  previousUrl;

  async search(query: string, direction?: number): Promise<SearchData> {
    let url;

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
      url = buildUrl(baseUrl, {
        q: query,
        type: 'track,artist',
        limit: 12,
      });
    }

    const response = await fetch(url);
    const data = await response.json() as SearchData;

    this.nextUrl = data.tracks.next;
    this.previousUrl = data.tracks.previous;

    return data;
  }

  hasDirection(direction) {
    return !!this.paginationUrl(direction);
  }

  paginationUrl(direction) {
    switch (direction) {
      case 1:
        return this.nextUrl;
      case -1:
        return this.previousUrl;
    }
  }
}

export interface SearchData {
  tracks: Tracks;
}

export interface Tracks {
  items: Track[];
  next: string;
  previous: string;
}

export interface Track {
  id: string;
  type: string;
  name: string;

  preview_url: string;

  album: Album;
  artists: Artist[];
}

export interface Album {
  id: string;
  type: string;
  name: string;
  images: Image[];
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist {
  id: string;
  type: string;
  name: string;
}
