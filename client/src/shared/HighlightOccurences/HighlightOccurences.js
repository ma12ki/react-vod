import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

export const HighlightOccurences = ({ term, children }) => {
    const highlighted = term ? reactStringReplace(children, term, (match, i) => <mark key={i}>{match}</mark>) : children;

    return (
        <span>{highlighted}</span>
    );
};

HighlightOccurences.propTypes = {
    term: PropTypes.string.isRequired,
    children: PropTypes.string
};

export default HighlightOccurences;
