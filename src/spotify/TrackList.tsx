import * as React from 'react';

import {Track} from './Track';
import {TrackData} from './api';

export interface TrackListProps {
    tracks: TrackData[];
}

export function TrackList(props: TrackListProps) {
    const tracks = props.tracks.map(
        (track) => (
            <li key={track.id}>
                <Track data={track}/>
            </li>
        )
    );

    return <ul>{tracks}</ul>;
}
