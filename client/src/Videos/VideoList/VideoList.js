import React from 'react';
import { connect } from 'react-redux';

import { getVideosArray } from '../selectors';
import { VideoItem } from '../VideoItem';

const VideoList = ({ items }) => {
    const videos = items.map((video) => {
        return (
            <VideoItem key={video.id} video={video} />
        );
    })

    return (
        <div>
            {videos}
        </div>
    );
};

const mapStateToProps = (state) => ({
    items: getVideosArray(state),
});

export default connect(mapStateToProps)(VideoList);
