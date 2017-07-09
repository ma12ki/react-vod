import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { debounce } from 'throttle-debounce';

import { getSearch } from '../selectors';
import { search } from '../ducks';
import styles from './videoSearch.module.css';

export class VideoSearch extends React.PureComponent {
    static propTypes = {
        search: PropTypes.string.isRequired,
        performSearch: PropTypes.func.isRequired,
    }

    debouncedSearch = debounce(100, false, (term) => {
        this.props.performSearch(term);
    });

    render() {
        const { search } = this.props;

        return <Input defaultValue={search} className={styles.input} onKeyUp={(e) => this.debouncedSearch(e.target.value)} placeholder='search files...' />;
    }
}

const mapStateToProps = (state) => ({
    search: getSearch(state),
});

const mapDispatchToProps = (dispatch) => ({
    performSearch: (term) => dispatch(search(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearch);
