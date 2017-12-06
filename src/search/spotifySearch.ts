import {buildUrl} from '../utils/urls';

interface Image {
  height: number;
  width: number;
  url: string;
}

interface SpotifyObject {
  id: string;
  type: string;
  name: string;
}

interface Artist extends SpotifyObject { }

interface Album extends SpotifyObject { 
  album_type: string;
  images: Image[];
}

export interface Track extends SpotifyObject {
  preview_url: string;
  album: Album;
  artists: Artist[];
}

interface SpotifyPagination<T> {
  items: T[];
  next: string;
  previous: string;
}

interface SearchData {
  tracks?: SpotifyPagination<Track>;
  artists?: SpotifyPagination<Track>;
  albums?: SpotifyPagination<Track>;
}

export enum Direction {
  Previous = -1,
  Next = 1,
}

type TrackType = 'track' | 'artist' | 'album';

export function isTrack(obj: SpotifyObject): obj is Track {
  return obj.type === 'track';
}

export class SpotifySearch {
  private static baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;
  private nextUrl;
  private previousUrl;

  async search(query, direction: Direction, type: TrackType = 'track'): Promise<SearchData> {
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
      url = buildUrl(SpotifySearch.baseUrl, {
        q: query,
        type,
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

  paginationUrl(direction: Direction) {
    switch (direction) {
      case Direction.Next:
        return this.nextUrl;
      case Direction.Previous:
        return this.previousUrl;
    }
  }
}
