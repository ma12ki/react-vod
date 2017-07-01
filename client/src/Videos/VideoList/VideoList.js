import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getVideosArray } from '../selectors';
import { VideoItem } from '../VideoItem';

const VideoList = ({ items }) => {
    const videos = items.map((video) => {
        return (
            <VideoItem key={video.id} video={video} />
        );
    })

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date created</th>
                    <th>Duration</th>
                    <th>Size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {videos}
            </tbody>
        </Table>
    );
};

const mapStateToProps = (state) => ({
    items: getVideosArray(state),
});

export default connect(mapStateToProps)(VideoList);
