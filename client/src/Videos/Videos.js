import React from 'react';
import { connect } from 'react-redux';

import { listLoadStart } from './videos.actions';

import VideoList from './VideoList/VideoList';

const Videos = (props) => {
    return (
        <div>
            <button onClick={props.onLoad} type='button'>load</button>
            <VideoList />
        </div>
    );
};

const mapStateToProps = (state) => ({
    items: [],
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(listLoadStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
