import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

import styles from './videoSortItem.module.css';

export const VideoSortItem = ({ className, currentSortCol, currentSortDir, colName, onSort, children }) => {
    const active = colName === currentSortCol && currentSortDir;
    const icon = active ?
        <FA name={`sort-${currentSortDir}`} className={styles.sortIcon} /> :
        <FA name='sort' className={styles.sortIcon} />;
    return (
        <th className={`${className} ${styles.interactive} ${active ? '' : styles.inactive}`} onClick={() => onSort({ col: colName, dir: getNextDir(colName, currentSortCol, currentSortDir)})}>
            {children}{icon}
        </th>
    );
};

const getNextDir = (colName, currentCol, currentDir) => {
    if (colName === currentCol) {
        return currentDir === 'asc' ? 'desc' : (currentDir === 'desc' ? '' : 'asc');
    }
    return 'asc';
};

VideoSortItem.propTypes = {
    className: PropTypes.string,
    currentSortCol: PropTypes.string.isRequired,
    currentSortDir: PropTypes.string.isRequired,
    colName: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};

export default VideoSortItem;
