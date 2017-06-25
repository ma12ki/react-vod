import React from 'react';
import { connect } from 'react-redux';

import { type } from '../router.selectors';
import { routesKeys as videosRoutesKeys } from '../Videos/routes';

import Videos from '../Videos/Videos';
import Video from '../Videos/Video/Video';

const RouteSwitcher = ({ type }) => {
    const component = getComponent(type);
    return (
        <div>
            { component }
        </div>
    );
};

const getComponent = (type) => {
    switch (type) {
        case videosRoutesKeys.home: {
            return <Videos />;
        }
        case videosRoutesKeys.video: {
            return <Video />;
        }
        default:
            return <div>404</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        type: type(state),
    };
};

export default connect(mapStateToProps)(RouteSwitcher);
export {
    RouteSwitcher,
};
