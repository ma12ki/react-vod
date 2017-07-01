import React from 'react';
import { connect } from 'react-redux';

import { getType } from '../../router.selectors';
import { rootRouteSwitcher } from '../../rootRoutes';

export const RouteSwitcher = ({ routeKey }) => {
    const component = rootRouteSwitcher(routeKey);
    return (
        <div>
            { component }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        routeKey: getType(state),
    };
};

export default connect(mapStateToProps)(RouteSwitcher);
