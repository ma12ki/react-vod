import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sort } from '../ducks';
import { getSort } from '../selectors';
import { VideoSortItem } from '../VideoSortItem';
import { utils } from '../../shared/cssModules';

export const VideoSort = ({ col, dir, onSort }) => {
    return (
        <tr>
            <VideoSortItem className={utils.alignLeft} currentSortCol={col} currentSortDir={dir} colName={'name'} onSort={onSort}>
                Name
            </VideoSortItem>
            <VideoSortItem className={utils.center} currentSortCol={col} currentSortDir={dir} colName={'dateCreated'} onSort={onSort}>
                Date created
            </VideoSortItem>
            <VideoSortItem className={utils.alignRight} currentSortCol={col} currentSortDir={dir} colName={'duration'} onSort={onSort}>
                Duration
            </VideoSortItem>
            <VideoSortItem className={utils.alignRight} currentSortCol={col} currentSortDir={dir} colName={'size'} onSort={onSort}>
                Size
            </VideoSortItem>
            <th></th>
        </tr>
    );
};

VideoSort.propTypes = {
    col: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    ...getSort(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSort: ({ col, dir }) => dispatch(sort({ col, dir })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSort);
