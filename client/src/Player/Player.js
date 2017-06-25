import React, { PropTypes } from 'react';

export const Player = (props) => {
    const { id, ext } = props;
    const type = getType(ext);
    const url = `http://localhost:3001/play/${id}`;

    return (
        <video controls>
            <source src={url} type={type} />
            Your browser does not support the <code>video</code> element.
        </video>
    );
};

Player.propTypes = {
    id: PropTypes.string.isRequired,
    ext: PropTypes.string.isRequired,
};

const getType = (ext) => {
    switch (ext) {
        case '.mp4':
            return 'video/mp4';
        case '.webm':
            return 'video/webm';
        default:
            throw new Error(`Unknown format: ${ext}`);
    }
};

export default Player;
