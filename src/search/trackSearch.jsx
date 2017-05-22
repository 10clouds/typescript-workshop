import {buildUrl} from '../utils/urls';

const baseUrl = `https://api.spotify.com/v1/search`;

export class TrackSearch {
  constructor() {
    this.nextUrl = null;
    this.previousUrl = null;
  }

  async search(query, direction) {
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
    const data = await response.json();
    
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
