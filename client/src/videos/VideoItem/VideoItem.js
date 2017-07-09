import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import moment from 'moment';
import FA from 'react-fontawesome';

import { routesKeys } from '../routes';
import { FileDuration, FileSize, HighlightOccurences } from '../../shared';
import { getSearch } from '../selectors';
import { utils } from '../../shared/cssModules';
import styles from './videoItem.module.css';

export const VideoItem = ({ video, searchTerm, navigateToVideo }) => {
    const { id, name, title, path, size = 0, duration = 0, dateCreated = new Date(0) } = video; 
    const titleHint = title ? `${title}; ${path}` : path;
    return (
        <tr className={styles.row} onClick={() => navigateToVideo(id)}>
            <td title={titleHint} className={utils.alignLeft}>
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

VideoItem.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        path: PropTypes.string,
        size: PropTypes.number,
        duration: PropTypes.number,
        dateCreated: PropTypes.any,
    }).isRequired,
    searchTerm: PropTypes.string,
};

const mapStateToProps = (state) => ({
    searchTerm: getSearch(state),
});

const mapDispatchToProps = (dispatch) => ({
    navigateToVideo: (id) => dispatch({ type: routesKeys.video, payload: { id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
