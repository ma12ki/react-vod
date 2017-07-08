import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getSortedVideos } from '../selectors';
import { VideoSort } from '../VideoSort';
import { VideoItem } from '../VideoItem';

export const VideoList = ({ items }) => {
    const videos = items.map((video) => {
        return (
            <VideoItem key={video.id} video={video} />
        );
    })

    return (
        <Table>
            <thead>
                <VideoSort />
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
    items: getSortedVideos(state),
});

export default connect(mapStateToProps)(VideoList);
