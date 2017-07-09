const getPath = ({ location }) => location.pathname;
const getType = ({ location }) => location.type;
const getPayload = ({ location }) => location.payload || {};
const getRoutesMap = ({ location }) => location.routesMap || {};
const getCurrentRouteConfig = (state) => {
    const routesMap = getRoutesMap(state);
    const currentType = getType(state);
    return routesMap[currentType] || {};
};
const getCurrentRouteTheme = (state) => getCurrentRouteConfig(state).theme;
const getCurrentRouteTitle = (state) => getCurrentRouteConfig(state).title;

export {
    getPath,
    getPayload,
    getType,
    getCurrentRouteConfig,
    getCurrentRouteTheme,
    getCurrentRouteTitle,
};
