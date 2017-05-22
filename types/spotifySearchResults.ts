export interface SpotifyObjectBase {
  id: string;
  name: string;
  type: string;
}

export interface SpotifyCoverData {
  height: number;
  width: number;
  url: string;
}

export interface SpotifyAlbumData extends SpotifyObjectBase {
  album_type: string;
  images: SpotifyCoverData[];
}

export interface SpotifyPlaylistData extends SpotifyObjectBase {
  collaborative: boolean;
}

export interface SpotifyArtistData extends SpotifyObjectBase {
  genres: string[];
}

export interface SpotifyTrackData extends SpotifyObjectBase {
  preview_url: string;
  album: SpotifyAlbumData;
  artists: SpotifyArtistData[];
}

export interface SpotifySearchResult<T> {
  items: T[];
  next: string;
  previous: string;
}

export interface SpotifyTrackResults {
  tracks: SpotifySearchResult<SpotifyTrackData>;
}