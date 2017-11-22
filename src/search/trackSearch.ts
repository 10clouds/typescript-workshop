import {buildUrl} from '../utils/urls';

export type Direction = 1|-1;

interface SpotifyObject {
  id: string;
  type: string;
  name: string;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Album extends SpotifyObject {
  album_type: string;
  images: Image[];
}

export interface Track extends SpotifyObject {
  preview_url: string;
  album: Album;
  artists: Artist[];
}

interface Artist extends SpotifyObject { }

interface SpotifyPagination<T> {
  items: T[];
  next: string;
  previous: string;
}

interface SearchData {
  tracks?: SpotifyPagination<Track>;
  albums?: SpotifyPagination<Artist>;
  artists?: SpotifyPagination<Album>;
}

export class TrackSearch {
  static readonly baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;

  nextUrl: string;
  previousUrl: string;

  async search(query: string, direction?: Direction): Promise<SearchData> {
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
        type: 'track',
        limit: 12,
      });
    }

    const response = await fetch(url);
    const data = await response.json();

    this.nextUrl = data.tracks.next;
    this.previousUrl = data.tracks.previous;

    return data;
  }

  hasDirection(direction: Direction) {
    return !!this.paginationUrl(direction);
  }

  private paginationUrl(direction: number) {
    switch (direction) {
      case 1:
        return this.nextUrl;
      case -1:
        return this.previousUrl;
    }
  }
}