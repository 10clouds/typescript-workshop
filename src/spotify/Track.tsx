import * as React from 'react';

import {Player} from './Player';
import {TrackData} from './api';

export interface TrackProps {
    data: TrackData;
}

export function Track(props: TrackProps) {
    return (
        <div>
            {props.data.name} 
            <Player src={props.data.preview_url}/>
        </div>
    );
}
