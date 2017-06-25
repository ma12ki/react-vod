import React from 'react';
import { connect } from 'react-redux';

import { listLoadStart } from './videos.actions';

const Videos = (props) => {
    return (
        <div>
            <button onClick={props.onLoad} type='button'>load</button>
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
