import {buildUrl} from '../utils/urls';

export class TrackSearch {
  private static readonly baseUrl = `https://api.spotify.com/v1/search`;

  private nextUrl?: string;
  private previousUrl?: string;

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
      url = buildUrl(TrackSearch.baseUrl, {
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

export interface SpotifyObject {
  id: string;
  type: string;
  name: string;
}

export interface SpotifyPagination {
  items: SpotifyObject[];
  next: string;
  previous: string;
}

export interface SearchData {
  tracks: Tracks;
}

export interface Tracks extends SpotifyPagination {
  items: Track[];
}

export interface Track extends SpotifyObject {
  preview_url: string;

  album: Album;
  artists: Artist[];
}

export interface Album extends SpotifyObject {
  images: Image[];
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist extends SpotifyObject {
  id: string;
  type: string;
  name: string;
}
