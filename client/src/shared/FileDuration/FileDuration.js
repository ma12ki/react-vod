import React from 'react';
import PropTypes from 'prop-types';

export const FileDuration = ({ duration }) => {
    const { hours, minutes, seconds } = splitDuration(duration);
    const hoursText = hours ? `${hours}h` : '';
    const minutesText = minutes ? `${minutes}m` : '';
    const secondsText = seconds ? `${seconds}s` : '';

    const finalText = [hoursText, minutesText, secondsText]
        .filter((t) => t)
        .join(' ');

    return (
        <span>{finalText}</span>
    );
};

FileDuration.propTypes = {
    duration: PropTypes.number.isRequired,
};

const splitDuration = (seconds) => {
    const secondRemainder = seconds % 60;
    const minutes = (seconds - secondRemainder) / 60;
    const minuteRemainder = minutes % 60;
    const hours = (minutes - minuteRemainder) / 60;

    return {
        hours,
        minutes: minuteRemainder,
        seconds: Math.round(secondRemainder),
    };
};

export default FileDuration;
