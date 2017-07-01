import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getFilteredVideos } from '../selectors';
import { VideoItem } from '../VideoItem';
import { utils } from '../../shared/cssModules';

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

const mapStateToProps = (state) => ({
    items: getFilteredVideos(state),
});

export default connect(mapStateToProps)(VideoList);
