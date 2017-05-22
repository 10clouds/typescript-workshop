import * as React from 'react';

import {Track} from './Track';
import {SpotifyTrackData} from './trackSearch';

export interface TrackListProps {
  tracks: SpotifyTrackData[];
}

export function TrackList(props: TrackListProps) {
  const tracks = props.tracks.map(
    (track) => (
      <li key={track.id}>
        <Track data={track}/>
      </li>
    )
  );

  return <ul className="track-list container">{tracks}</ul>;
}
