import React from 'react';
import PropTypes from 'prop-types';

import styles from './loader.module.css';

export const Loader = ({ loading, children, ...otherProps }) => {
    return (
        <div className={loading ? styles.loading : ''}>
            {React.cloneElement(children, {...otherProps})}
        </div>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.element
};

export default Loader;
