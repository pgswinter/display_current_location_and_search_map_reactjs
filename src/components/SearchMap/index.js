import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestLocationMap } from '../../actions/LocationMap/LocationMapActions';
import { requestSearchMap } from '../../actions/SearchMap/SearchMapActions';

import CurrentLocationMap from '../CurrentLocationMap';
import loading from '../../images/giphy.gif';

class SearchMap extends Component {

    state = {
        google: window.google ? window.google : {},
    }

    componentDidMount() {
        this.props.requestLocationMap();
    }

    render() {
        const { data, isRequested } = this.props;
        // Detect exist location data
        // const detectExistLocationData = Object.entries(data).length === 0 && data.constructor === Object;
        const { google } = this.state;
        return (
            <div>
                {
                    isRequested ?
                        <CurrentLocationMap
                            google={google}
                            locationData={data}
                        /> :
                        <img style={{ margin: '0 auto', display: 'block', width: '100vw' }} src={loading} alt="_loading_thumb" />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { location: { data, isRequested }, searchMap } = state;
    return {
        data,
        isRequested,
        searchMap,
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestLocationMap: () => { dispatch(requestLocationMap()) },
    requestSearchMap: (params) => dispatch(requestSearchMap(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
