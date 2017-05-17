import * as React from 'react';

import {Player} from './Player';
import {TrackData} from './api';

export interface TrackProps {
    data: TrackData;
}

export function Track(props: TrackProps) {
    return (
        <div>
            <img 
                className="track-cover"
                src={props.data.album.images[1].url} 
                alt="album cover"
            />
            <div className="track-player">
                <Player src={props.data.preview_url}/>
                {props.data.name} 
            </div>
        </div>
    );
}
