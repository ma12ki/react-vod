import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';

import styles from './loader.module.css';

export const Loader = ({ loading, children }) => {
    const loaderAddon = loading || true ?
        (<div className={styles.loaderContainer}>
            <div className={styles.overlay}></div>
            <FA name='cog' spin={true} className={styles.spinner} />
        </div>) :
        '';
    return (
        <div className={styles.container}>
            <div className={loading || true ? styles.transparent : ''}>{children}</div>
            {loaderAddon}
        </div>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.element
};

export const makeConnectedLoader = (loadingSelector, errorSelector) => {
    const mapStateToProps = (state) => ({
        loading: loadingSelector(state),
        error: errorSelector(state),
    });
    return connect(mapStateToProps)(Loader);
};

export default Loader;
