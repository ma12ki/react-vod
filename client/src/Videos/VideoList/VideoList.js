import React from 'react';
import { connect } from 'react-redux';

import { videosItems } from '../videos.selectors';
import { VideoItem } from '../VideoItem/VideoItem';

const VideoList = (props) => {
    const items = props.items.map((video) => {
        return (
            <VideoItem key={video.id} video={video} />
        );
    })

    return (
        <div>
            {items}
        </div>
    );
};

const mapStateToProps = (state) => ({
    items: videosItems(state),
});

export default connect(mapStateToProps)(VideoList);
