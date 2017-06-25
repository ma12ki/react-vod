import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { routesKeys } from '../routes';

export const VideoItem = (props) => {
    const { video } = props;
    const { id, name, ext, title, size, duration, dateCreated, dateModified } = video; 

    return (
        <div>
            {name}{ext} - {title}
            <Link href={{ type: routesKeys.video, payload: { id } }}>Play</Link>
        </div>
    );
};

export default VideoItem;
