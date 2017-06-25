import React from 'react';
import { connect } from 'react-redux';

import { videosItems } from '../videos.selectors';

const VideoList = (props) => {
    const items = props.items.map((video) => {
        return (
            <div key={video.id}>{video.name}</div>
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
