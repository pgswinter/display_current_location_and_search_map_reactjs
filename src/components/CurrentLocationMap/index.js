import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.css';

class CurrentLocation extends Component {
    constructor(props) {
        super(props);

        this.map = React.createRef();
        this.pacCard = React.createRef();
        this.pacInput = React.createRef();
        this.useStrictBounds = React.createRef();
        this.infowindowContent = React.createRef();
        this.changetypeAll = React.createRef();
        this.changetypeEstablishment = React.createRef();
        this.changetypeAddress = React.createRef();
        this.changetypeGeocode = React.createRef();
        this.placeIcon = React.createRef();
        this.placeTitle = React.createRef();
        this.placeAddress = React.createRef();

    }

    componentDidMount() {
        this.initMap();
    }

    initMap = () => {
        const { google, locationData } = this.props;
        var map = new google.maps.Map(this.map.current, {
            center: { lat: locationData.latitude, lng: locationData.longitude },
            zoom: 13
        });

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.pacCard.current);

        var autocomplete = new google.maps.places.Autocomplete(this.pacInput.current);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(this.infowindowContent.current);
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed',  () => {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            ReactDOM.findDOMNode(this.placeIcon.current).src = place.icon;
            ReactDOM.findDOMNode(this.placeTitle.current).textContent = place.name;
            ReactDOM.findDOMNode(this.placeAddress.current).textContent = address;
            // this.infowindowContent.current.children['place-icon'].src = place.icon;
            // this.infowindowContent.current.children['place-name'].textContent = place.name;
            // this.infowindowContent.current.children['place-address'].textContent = address;
            infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        const setupClickListener = (obj, types) => {
            ReactDOM.findDOMNode(obj).addEventListener('click', () => {
                autocomplete.setTypes(types);
            });
        }

        setupClickListener(this.changetypeAll.current, []);
        setupClickListener(this.changetypeEstablishment.current, ['address']);
        setupClickListener(this.changetypeAddress.current, ['establishment']);
        setupClickListener(this.changetypeGeocode.current, ['geocode']);

        // const setupClickListener = (id, types) => {
        //     var radioButton = document.getElementById(id);
        //     radioButton.addEventListener('click', function () {
        //         autocomplete.setTypes(types);
        //     });
        // }
        
        // setupClickListener('changetype-all', []);
        // setupClickListener('changetype-address', ['address']);
        // setupClickListener('changetype-establishment', ['establishment']);
        // setupClickListener('changetype-geocode', ['geocode']);

        this.useStrictBounds.current.addEventListener('click', function () {
            console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({ strictBounds: this.checked });
        });
    }


    render() {
        return (
            <React.Fragment>
                {/*
                    <div ref={this.infoWindowContent}></div>
                    <div className="map" style={{ height: '40vh' }} ref={this.googleMap}></div>
                    <input type="text" ref={this.autocompleteInput} />
                */}
                <div className="pac-card" ref={this.pacCard}>
                    <div>
                        <div className="title">
                            Autocomplete search
                        </div>
                        <div className="pac-controls">
                            <input 
                                type="radio" 
                                name="type" 
                                className="changetype-all"
                                checked="checked" 
                                ref={this.changetypeAll}
                            />
                            <label htmlFor="changetype-all">All</label>

                            <input 
                                type="radio" 
                                name="type" 
                                className="changetype-establishment"
                                ref={this.changetypeEstablishment}
                            />
                            <label htmlFor="changetype-establishment">Establishments</label>

                            <input 
                                type="radio" 
                                name="type" 
                                className="changetype-address" 
                                ref={this.changetypeAddress}
                            />
                            <label htmlFor="changetype-address">Addresses</label>

                            <input 
                                type="radio" 
                                name="type" 
                                className="changetype-geocode"
                                ref={this.changetypeGeocode}
                            />
                            <label htmlFor="changetype-geocode">Geocodes</label>
                        </div>
                        <div className="pac-controls">
                            <input type="checkbox" className="use-strict-bounds" value="" ref={this.useStrictBounds} />
                            <label htmlFor="use-strict-bounds">Strict Bounds</label>
                        </div>
                    </div>
                    <div className="pac-container">
                        <input className="pac-input" type="text"
                            placeholder="Enter a location" ref={this.pacInput} />
                    </div>
                </div>
                <div style={{ height: '40vh' }} className="map" ref={this.map}></div>
                <div className="infowindow-content" ref={this.infowindowContent}>
                    <img 
                        src=""
                        width="16" 
                        height="16" 
                        className="place-icon" 
                        alt="_place_icon_thumb"
                        ref={this.placeIcon}
                    />
                    <span
                        className="title"
                        ref={this.placeTitle}
                    ></span><br />
                    <span 
                        className="place-address"
                        ref={this.placeAddress}
                    ></span>
                </div>

            </ React.Fragment>
        )
    }
}



export default CurrentLocation;
