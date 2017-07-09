import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getCurrentRouteTheme } from '../../router.selectors';
import styles from './themedContainer.module.css';

export const ThemedContainer = ({ theme, children }) => {
  const classes = classNames(
    styles.container,
    theme,
  );
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: getCurrentRouteTheme(state),
});

export default connect(mapStateToProps)(ThemedContainer);
