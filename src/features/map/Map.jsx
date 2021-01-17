import React, { Component } from 'react';
import {
  Map as GoogleMap,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Circle,
} from 'google-maps-react';

import './map.scss';

class Map extends Component {
  state = {
    zoom: 15,
    showingInfoWindow: false,
    selectedPlace: {},
    activeMarker: {},
  };

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    const { stores, distance } = this.props;
    const distanceInKm = parseInt(distance) * 1000;
    return (
      <div className='map-component'>
        {this.props.currentPosition && (
          <GoogleMap
            google={this.props.google}
            zoom={this.state.zoom}
            initialCenter={this.props.currentPosition}
            onGoogleApi
            onClick={() => this.onMapClick()}
          >
            <Marker position={this.props.currentPosition} />
            <Circle
              center={this.props.currentPosition}
              radius={distanceInKm}
              strokeColor='#017ac7'
              strokeOpacity={0.3}
              strokeWeight={1}
              fillColor='#017ac7'
              fillOpacity={0.1}
            />
            {stores &&
              stores.map((store) => (
                <Marker
                  key={store.id}
                  title={store.name}
                  name={store.name}
                  position={{ lat: store.latitude, lng: store.longitude }}
                  onClick={(props, marker, e) =>
                    this.onMarkerClick(props, marker, e)
                  }
                />
              ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </GoogleMap>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_KEY,
})(Map);
