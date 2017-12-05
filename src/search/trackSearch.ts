import {buildUrl} from '../utils/urls';


export interface Image {
  height: number;
  width: number;
  url: string;
}

export type SpotifyType = 'track' | 'album' | 'artist';

export interface SpotifyObject {
  id: string;
  type: SpotifyType;
  name: string;
}

export interface Album extends SpotifyObject {
  album_type: string;
  images: Image[];
}

export interface Track extends SpotifyObject {
  preview_url: string;
  album: Album;
  artists: Artist[];
}

export interface Artist extends SpotifyObject {
}

export interface SpotifyPagination<T extends SpotifyObject> {
  items: T[];
  next: string;
  previous: string;
}

export interface SearchData {
  tracks?: SpotifyPagination<Track>;
  artists?: SpotifyPagination<Artist>;
  albums?: SpotifyPagination<Album>;
}

export enum Direction {
  Next = 1,
  Previous = -1,
}



export class SpotifySearch {
  private static readonly baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;

  private nextUrl: string;
  private previousUrl: string;

  async search(query: string, direction?: Direction, type: SpotifyType = 'track') {
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
      url = buildUrl(SpotifySearch.baseUrl, {
        q: query,
        type: type,
        limit: 12,
      });
    }

    const response = await fetch(url);
    const data = await response.json() as SearchData;

    this.nextUrl = data.tracks.next;
    this.previousUrl = data.tracks.previous;

    return data;
  }

  hasDirection(direction: Direction) {
    return !!this.paginationUrl(direction);
  }

  paginationUrl(direction: Direction) {
    switch (direction) {
      case Direction.Next:
        return this.nextUrl;
      case Direction.Previous:
        return this.previousUrl;
    }
  }
}
