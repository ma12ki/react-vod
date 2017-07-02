import React from 'react';
import PropTypes from 'prop-types';
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

RouteSwitcher.propTypes = {
    routeKey: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        routeKey: getType(state),
    };
};

export default connect(mapStateToProps)(RouteSwitcher);
