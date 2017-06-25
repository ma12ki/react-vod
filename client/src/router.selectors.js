const path = ({ location }) => location.pathname;
const type = ({ location }) => location.type;
const payload = ({ location }) => location.payload || {};

export {
    path,
    payload,
    type,
};
