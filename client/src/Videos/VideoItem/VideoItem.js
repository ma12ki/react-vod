import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import moment from 'moment';
import FA from 'react-fontawesome';

import { routesKeys } from '../routes';
import { FileDuration, FileSize, HighlightOccurences } from '../../shared';
import { getSearch } from '../selectors';

export const VideoItem = ({ video, searchTerm }) => {
    const { id, name, title, path, size, duration, dateCreated } = video; 

    return (
        <tr>
            <td title={title + '; ' + path}>
                <HighlightOccurences term={searchTerm}>{name}</HighlightOccurences>
            </td>
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

const mapStateToProps = (state) => ({
    searchTerm: getSearch(state),
});

export default connect(mapStateToProps)(VideoItem);
