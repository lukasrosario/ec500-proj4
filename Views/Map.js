import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { uploadLocation } from '../util/firestoreUtil';

export const Map = () => {
  const mapRef = useRef();
  const [location, setLocation] = useState({
    latitude: 42.3505,
    longitude: -71.1054,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  useEffect(() => {
    const setInitialLocation = async () => {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              ...location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            mapRef.current.animateToRegion({
              ...location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            Alert.alert('Would you like to store this location?', '', [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Yes',
                onPress: () =>
                  uploadLocation(
                    position.coords.latitude,
                    position.coords.longitude
                  )
              }
            ]);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };
    setInitialLocation();
  }, []);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} }
        ]
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} region={location}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title="Here you are"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Map;
