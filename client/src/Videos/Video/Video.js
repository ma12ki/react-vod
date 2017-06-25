import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { routesKeys } from '../routes';
import { payload } from '../../router.selectors';
import { videosEntities } from '../videos.selectors';
import Player from '../../Player/Player';

export const Video = (props) => {
    const { video } = props;
    const { id, name, ext, title, size, duration, dateCreated, dateModified } = video; 
    return (
        <div>
            <Player id={id} ext={ext} />
            {name}{ext} - {title}
            <Link href={{ type: routesKeys.home }}>Home</Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { id } = payload(state);
    const entities = videosEntities(state);
    return {
        video: entities[id] || {},
    };
};

export default connect(mapStateToProps)(Video);
