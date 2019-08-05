import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestSearchMap } from '../../actions/SearchMap/SearchMapActions';

class AutocompleteEntry extends Component {
    constructor(props) {
        super(props);

        this.autocompleteInput = React.createRef();
    }

    componentDidMount() {
        const { google } = this.props;
        this.autocompleteInput = new google.maps.Map(this.autocompleteInput.current)
    }

    render() {
        return (
            <React.Fragment>
                <input type="text" ref={this.autocompleteInput} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { searchMap } = state;
    return {
        searchMap,
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestSearchMap: (params) => dispatch(requestSearchMap(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteEntry)
