import {buildUrl} from '../utils/urls';


export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface SpotifyObject {
  id: string;
  type: string;
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

export interface SpotifyPagination {
  items: SpotifyObject[];
  next: string;
  previous: string;
}

export interface Tracks extends SpotifyPagination {
  items: Track[];
}

export interface SearchData {
  tracks: Tracks;
}

export enum Direction {
  Next = 1,
  Previous = -1,
}

export class TrackSearch {
  private static readonly baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;

  private nextUrl: string;
  private previousUrl: string;

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
      url = buildUrl(TrackSearch.baseUrl, {
        q: query,
        type: 'track',
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
