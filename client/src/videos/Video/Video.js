import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import { routesKeys } from '../routes';
import { getPayload } from '../../router.selectors';
import { getVideosEntity } from '../selectors';
import { loadVideoStart } from '../ducks';
import { Player } from '../../player';
import { FileDuration, FileSize } from '../../shared';

export class Video extends React.PureComponent {
    static propTypes = {
        video: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            ext: PropTypes.string,
            title: PropTypes.string,
            size: PropTypes.number,
            duration: PropTypes.number,
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
        const { id, name, ext, title, size = 0, duration = 0 } = video; 
        return (
            <div>
                <Card>
                    <CardBlock>
                        { id ? <Player id={id} ext={ext} /> : null }
                    </CardBlock>
                    <CardBlock>
                        <CardTitle>{name}{ext}</CardTitle>
                        <CardSubtitle>
                            <FileDuration duration={duration} />, <FileSize size={size} />
                        </CardSubtitle>
                        <CardText>{title}</CardText>
                        <Link to={{ type: routesKeys.home }}>{'<<'} Back</Link>
                    </CardBlock>
                </Card>
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
