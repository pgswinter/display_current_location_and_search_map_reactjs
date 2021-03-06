import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { requestLocationMap } from '../../actions/LocationMap/LocationMapActions';
import { requestSearchMap } from '../../actions/SearchMap/SearchMapActions';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class LocationMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centerState: {
                lat: '',
                lng: '',
            },
            apiKey: 'AIzaSyAIj6IcCS_-CUz9Ti-R1Xdy43ORPWIIHhI', // Google develop API Key
            isSearching: true,
        };
    }

    componentDidMount() {
        this.props.requestLocationMap();
    }

    openSearchModal = (e) => {
        this.setState({
            isSearching: true
        });
        this.handleQuerySearchMap(e);
    }

    handleQuerySearchMap = (e) => {
        const { apiKey } = this.state;
        const params = {
            query: e.target.value,
            key: apiKey,
        }
        this.props.requestSearchMap(params);
    }

    handleRenewLocation = (item) => {
        if (!!item) {
            const { geometry: { location: { lat, lng } } } = item;
            this.setState(prevState => {
                const { centerState } = prevState;
                const newData = centerState;
                newData.lat = lat;
                newData.lng = lng;
                return {
                    ...prevState,
                    centerState: newData,
                    isSearching: false,
                }
            });
        }
    }

    render() {
        const { isSearching, centerState, apiKey } = this.state;
        const { data: { latitude, longitude }, searchMap: { data: { results } } } = this.props;
        const center = {
            lat: latitude,
            lng: longitude,
        }
        const zoom = 11;

        const displayCenter = (centerState.lat === "" || centerState.lng === "") ? center : centerState;
        const displayLatitude = centerState.lat === "" ? latitude : centerState.lat;
        const displayLongitude = centerState.lng === "" ? longitude : centerState.lng;

        return (
            <React.Fragment>
                {(!!results && isSearching) ?
                    <div>
                        <input type="text" onChange={(e) => { this.handleQuerySearchMap(e) }} />
                        <ul>
                            {results.map(item => <li onClick={() => { this.handleRenewLocation(item) }}>
                                {item.formatted_address}
                            </li>)}
                        </ul>
                    </div> :
                    <div>
                        <input type="text" onClick={(e) => { this.openSearchModal(e) }} />
                        <div style={{ height: '50vh', width: '100vw' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: apiKey }}
                                defaultCenter={displayCenter}
                                defaultZoom={zoom}
                            >
                                <AnyReactComponent
                                    lat={displayLatitude}
                                    lng={displayLongitude}
                                    text="My Marker"
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
};

const mapStateToProps = state => {
    const { location: { data }, searchMap } = state;
    return {
        data,
        searchMap,
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestLocationMap: () => { dispatch(requestLocationMap()) },
    requestSearchMap: (params) => dispatch(requestSearchMap(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationMap)
