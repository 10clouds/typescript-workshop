import {buildUrl} from '../utils/urls';

const baseUrl = `https://spotify-proxy-workshop.herokuapp.com/search`;
export type Direction = 1|-1;

export class TrackSearch {
  previousUrl: string;
  nextUrl: string;

  async search(query: string, direction?: Direction) {
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

  paginationUrl(direction: Direction) {
    switch (direction) {
      case 1:
        return this.nextUrl;
      case -1:
        return this.previousUrl;
    }
  }
}
