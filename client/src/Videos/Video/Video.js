import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { routesKeys } from '../routes';
import { getPayload } from '../../router.selectors';
import { getVideosEntity } from '../selectors';
import { loadVideoStart } from '../ducks';
import Player from '../../Player/Player';

export class Video extends React.PureComponent {
    static propTypes = {
        video: PropTypes.shape({
            id: PropTypes.string,
        }),
        loadVideo: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { video } = this.props;
        if (!video.id) {
            this.props.loadVideo();
        }
    }

    render() {
        const { video } = this.props;
        const { id, name, ext, title, size, duration, dateCreated, dateModified } = video; 
        return (
            <div>
                { id ? <Player id={id} ext={ext} /> : null }
                {name}{ext} - {title}
                <Link href={{ type: routesKeys.home }}>Home</Link>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { id } = getPayload(state);
    const video = getVideosEntity(state, id);

    return {
        video,
        id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { id } = stateProps;
    const { dispatch } = dispatchProps;
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        loadVideo: () => dispatch(loadVideoStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Video);
