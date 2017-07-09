import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getInitialized } from '../selectors';
import { loadVideosStart } from '../ducks';
import { VideoList } from '../VideoList';
import { VideoSearch } from '../VideoSearch';
import { VideoRefresh } from '../VideoRefresh';
import styles from './videos.module.css';

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
                <div className={styles.flex}>
                    <VideoSearch />
                    <VideoRefresh />
                </div>
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
