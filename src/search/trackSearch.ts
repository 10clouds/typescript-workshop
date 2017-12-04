import {buildUrl} from '../utils/urls';

const baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface Album {
  id: string;
  type: string;
  name: string;
  album_type: string;
  images: Image[];
}

export interface Track {
  id: string;
  type: string;
  name: string;
  preview_url: string;
  album: Album;
  artists: Artist[];
}

export interface Artist {
  id: string;
  type: string;
  name: string;  
}

export interface Tracks {
  items: Track[];
  next: string;
  previous: string;
}

export interface SearchData {
  tracks: Tracks;
}

export enum Direction {
  Next = 1,
  Previous = -1,
}

export class TrackSearch {
  nextUrl: string;
  previousUrl: string;

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
      url = buildUrl(baseUrl, {
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
