import React from 'react';
import PropTypes from 'prop-types';

import { apiUrl } from '../../config';
import { aspectRatios } from '../../shared/cssModules';

export const Player = (props) => {
    const { id, ext } = props;
    const type = getType(ext);
    const url = `${apiUrl}play/${id}`;

    return (
        <div className={aspectRatios.ar16_9}>
            <video controls preload='metadata'>
                <source src={url} type={type} />
                Your browser does not support the <code>video</code> element.
            </video>
        </div>
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
