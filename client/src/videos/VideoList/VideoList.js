import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getFilteredVideos } from '../selectors';
import { VideoItem } from '../VideoItem';
import { utils } from '../../shared/cssModules';

export const VideoList = ({ items }) => {
    const videos = items.map((video) => {
        return (
            <VideoItem key={video.id} video={video} />
        );
    })

    return (
        <Table>
            <thead>
                <tr>
                    <th className={utils.alignLeft}>Name</th>
                    <th className={utils.center}>Date created</th>
                    <th className={utils.alignRight}>Duration</th>
                    <th className={utils.alignRight}>Size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {videos}
            </tbody>
        </Table>
    );
};

VideoList.propTypes = {
    items: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    items: getFilteredVideos(state),
});

export default connect(mapStateToProps)(VideoList);
