import React from 'react';
import PropTypes from 'prop-types';

export const VideoSortItem = ({ className, currentSortCol, currentSortDir, colName, onSort, children }) => {
    return (
        <th className={className} onClick={() => onSort({ col: colName, dir: getNextDir(colName, currentSortCol, currentSortDir)})}>{children}</th>
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
