import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

class MapView extends Component {
  state = {
    center: null,
  };

  handleMapMounted = map => {
    this.map = map;
    this.props.onMapReady && this.props.onMapReady();
  };

  animateToRegion(coordinates) {
    this.setState({
      center: { lat: coordinates.latitude, lng: coordinates.longitude },
    });
  }

  onDragEnd = () => {
    const { onRegionChangeComplete } = this.props;
    if (this.map && onRegionChangeComplete) {
      const center = this.map.getCenter();
      onRegionChangeComplete({
        latitude: center.lat(),
        longitude: center.lng(),
      });
    }
  };

  render() {
    const {
      region,
      initialRegion,
      onRegionChange,
      onPress,
      options,
      style,
    } = this.props;
    const { center } = this.state;

    const centerProps = region
      ? {
          center: {
            lat: region.latitude,
            lng: region.longitude,
          },
        }
      : center
      ? { center }
      : {
          defaultCenter: {
            lat: initialRegion.latitude,
            lng: initialRegion.longitude,
          },
        };

    return (
      <div style={{ height: '100%', ...style }}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          {...centerProps}
          onDragStart={onRegionChange}
          onIdle={this.onDragEnd}
          defaultZoom={15}
          onClick={onPress}
          options={options}
        >
          {this.props.children}
        </GoogleMapContainer>
      </div>
    );
  }
}

export default MapView;
