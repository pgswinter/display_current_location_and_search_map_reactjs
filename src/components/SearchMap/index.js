import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestLocationMap } from '../../actions/LocationMap/LocationMapActions';

import CurrentLocationMap from '../CurrentLocationMap';

class SearchMap extends Component {

    state = {
        google: window.google ? window.google : {},
    }

    render() {
        const { data } = this.props;
        console.log(data)
        const { google } = this.state;
        return (
            <div>
                <CurrentLocationMap
                    google={google}
                    data={data && data}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { location: { data } } = state;
    return {
        data,
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestLocationMap: () => { dispatch(requestLocationMap()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
