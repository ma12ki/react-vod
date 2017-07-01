import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getInitialized } from '../selectors';
import { loadVideosStart } from '../ducks';
import { VideoList } from '../VideoList';

export class Videos extends React.PureComponent {
    static propTypes = {
        initialized: PropTypes.bool.isRequired,
        loadVideos: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.initialized) {
            this.props.loadVideos();
        }
    }

    render() {
        return <VideoList />;
    }
}

const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadVideos: () => dispatch(loadVideosStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
