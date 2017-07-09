import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

import { getListRefreshLoading, getListRefreshError } from '../selectors';
import { refreshVideosStart } from '../ducks';

export const VideoRefresh = ({ loading, refreshVideos }) => {
    return (
        <Button color='link' disabled={loading} onClick={refreshVideos} title='Rescan data on the disk'>
            <FA name='refresh' spin={loading} />
        </Button>
    );
};

VideoRefresh.propTypes = {
    loading: PropTypes.bool.isRequired,
    refreshVideos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loading: getListRefreshLoading(state),
    error: getListRefreshError(state),
});

const mapDispatchToProps = (dispatch) => ({
    refreshVideos: () => dispatch(refreshVideosStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoRefresh);
