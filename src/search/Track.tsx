import * as React from 'react';

import {Player} from './Player';
import {SpotifyTrackData} from './trackSearch';

export interface TrackProps {
  data: SpotifyTrackData;
}

export function Track(props: TrackProps) {
  const track = props.data;
  const album = props.data.album;
  const albumImage = album.images[1].url;
  const artists = props.data.artists;
  const artistNames = artists.map((artist) => artist.name).join(', ');

  return (
    <div className="track"
       style={{
        backgroundImage: `url(${albumImage})`,
       }}>
      
      <div className="track-overlay">
        <div className="track-info">
          <p className="track-title">
            {track.name}
          </p>
          <p className="track-album">
            {album.name} by {artistNames}
          </p>
        </div>
        <div className="track-player">
          <Player src={track.preview_url}/>
        </div>
      </div>
    </div>
  );
}
