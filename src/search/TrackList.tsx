import * as React from 'react';

import {Track} from './Track';

export function TrackList(props: any) {
  const tracks = props.tracks.map(
    (track: any) => (
      <li key={track.id}>
        <Track data={track}/>
      </li>
    )
  );

  return <ul className="track-list container">{tracks}</ul>;
}
