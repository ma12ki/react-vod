import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getInitialized } from '../selectors';
import { loadVideosStart } from '../ducks';
import { VideoList } from '../VideoList';
import { VideoSearch } from '../VideoSearch';

export class Videos extends React.PureComponent {
    static propTypes = {
        initialized: PropTypes.bool.isRequired,
        loadVideos: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (!this.props.initialized) {
            this.props.loadVideos();
        }
    }

    render() {
        return (
            <div>
                <VideoSearch />
                <VideoList />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadVideos: () => dispatch(loadVideosStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
