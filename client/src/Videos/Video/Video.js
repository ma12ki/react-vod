import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { routesKeys } from '../routes';
import { getPayload } from '../../router.selectors';
import { getVideosEntity } from '../selectors';
import Player from '../../Player/Player';

export const Video = ({ video }) => {
    const { id, name, ext, title, size, duration, dateCreated, dateModified } = video; 
    return (
        <div>
            { id ? <Player id={id} ext={ext} /> : null }
            {name}{ext} - {title}
            <Link href={{ type: routesKeys.home }}>Home</Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { id } = getPayload(state);
    const video = getVideosEntity(state, id);
    return {
        video,
    };
};

export default connect(mapStateToProps)(Video);
