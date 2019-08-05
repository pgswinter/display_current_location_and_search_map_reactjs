import React, { Component } from 'react';


import AutocompleteEntry from '../AutocompleteEntry';

class CurrentLocation extends Component {
    constructor(props) {
        super(props);
        
        this.googleMap = React.createRef();
    }

    componentDidMount() {
        const { google, data } = this.props;
        this.googleMap = new google.maps.Map(this.googleMap.current, {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 13
        });
    }

    render() {
        const { data, google } = this.props;
        return (
            <React.Fragment>
                <AutocompleteEntry
                    data={data && data}
                    google={google}
                />
                <div className="map" style={{ height: '40vh' }} ref={this.googleMap}></div>
            </ React.Fragment>
        )
    }
}



export default CurrentLocation;
