import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import moment from 'moment';
import FA from 'react-fontawesome';

import { routesKeys } from '../routes';
import { FileDuration } from '../../shared';

export const VideoItem = (props) => {
    const { video } = props;
    const { id, name, title, path, size, duration, dateCreated } = video; 

    return (
        <tr>
            <th scope='row' title={title + '; ' + path}>{name}</th>
            <td>{moment(dateCreated).format('DD.MM.YYYY')}</td>
            <td><FileDuration duration={duration} /></td>
            <td>{size}</td>
            <td>
                <Link href={{ type: routesKeys.video, payload: { id } }}>
                    <FA name='play' />
                </Link>
            </td>
        </tr>
    );
};

export default VideoItem;
