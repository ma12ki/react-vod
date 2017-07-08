import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import moment from 'moment';
import FA from 'react-fontawesome';

import { routesKeys } from '../routes';
import { FileDuration, FileSize, HighlightOccurences } from '../../shared';
import { getSearch } from '../selectors';
import { utils } from '../../shared/cssModules';

export const VideoItem = ({ video, searchTerm }) => {
    const { id, name, title, path, size, duration, dateCreated } = video; 

    return (
        <tr>
            <td title={title + '; ' + path} className={utils.alignLeft}>
                <HighlightOccurences term={searchTerm}>{name}</HighlightOccurences>
            </td>
            <td className={utils.center}>{moment(dateCreated).format('DD.MM.YYYY')}</td>
            <td className={utils.alignRight}><FileDuration duration={duration} /></td>
            <td className={utils.alignRight}><FileSize size={size} /></td>
            <td className={utils.center}>
                <Link to={{ type: routesKeys.video, payload: { id } }}>
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
