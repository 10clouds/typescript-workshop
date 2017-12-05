import React from 'react';

import {Track} from './Track';

export function TrackList(props) {
  const tracks = props.tracks.map(
    (track) => (
      <li key={track.id}>
        <Track data={track}/>
      </li>
    )
  );

  return <ul className="track-list container">{tracks}</ul>;
}
