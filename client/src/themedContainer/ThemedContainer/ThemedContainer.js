import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getCurrentRouteTheme, getCurrentRouteTitle } from '../../router.selectors';
import styles from './themedContainer.module.css';

const titleBase = 'React-VoD';

export const ThemedContainer = ({ theme, title, children }) => {
  document.title = getPageTitle(title);
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

const getPageTitle = (title) => {
    if (title) {
        return `${title} | ${titleBase}`;
    }
    return titleBase;
};

const mapStateToProps = (state) => ({
  theme: getCurrentRouteTheme(state),
  title: getCurrentRouteTitle(state),
});

export default connect(mapStateToProps)(ThemedContainer);
