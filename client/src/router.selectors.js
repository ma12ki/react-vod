const getPath = ({ location }) => location.pathname;
const getType = ({ location }) => location.type;
const getPayload = ({ location }) => location.payload || {};

export {
    getPath,
    getPayload,
    getType,
};
