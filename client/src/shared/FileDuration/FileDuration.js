import React from 'react';
import PropTypes from 'prop-types';

export const FileDuration = ({ duration }) => {
    const { hours, minutes, seconds } = splitDuration(duration);
    const secondsText = zeroFill(seconds);
    const minutesText = zeroFill(minutes);
    const hoursText = hours;

    const finalText = [hoursText, minutesText, secondsText]
        .join(':');

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

const zeroFill = (num) => `00${num}`.substr(-2, 2);

export default FileDuration;
