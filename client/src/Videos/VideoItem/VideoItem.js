import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import moment from 'moment';
import FA from 'react-fontawesome';

import { routesKeys } from '../routes';
import { FileDuration, FileSize } from '../../shared';

export const VideoItem = (props) => {
    const { video } = props;
    const { id, name, title, path, size, duration, dateCreated } = video; 

    return (
        <tr>
            <td title={title + '; ' + path}>{name}</td>
            <td>{moment(dateCreated).format('DD.MM.YYYY')}</td>
            <td><FileDuration duration={duration} /></td>
            <td><FileSize size={size} /></td>
            <td>
                <Link href={{ type: routesKeys.video, payload: { id } }}>
                    <FA name='play' />
                </Link>
            </td>
        </tr>
    );
};

export default VideoItem;
