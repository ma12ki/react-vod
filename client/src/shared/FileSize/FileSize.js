import React from 'react';
import PropTypes from 'prop-types';

export const FileSize = ({ size }) => {
    const { amount, unit } = formatSize(size);

    return (
        <span>{amount}{unit}</span>
    );
};

FileSize.propTypes = {
    size: PropTypes.number.isRequired,
};

const formatSize = (bytes) => {
    const units = ['kB', 'MB', 'GB'];

    const { amount, unit } = units.reduce((amountAndUnit, currentUnit) => {
        const newAmount = Math.floor(amountAndUnit.amount / 1024);
        if (newAmount > 0) {
            return {
                amount: newAmount,
                unit: currentUnit,
            };
        }
        return amountAndUnit;
    }, { amount: bytes, unit: 'B' })

    return {
        amount,
        unit,
    };
};

export default FileSize;
