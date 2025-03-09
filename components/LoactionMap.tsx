// components/LocationMap.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LocationMap = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [permissionResponse, setPermissionResponse] =
    useState<Location.PermissionResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Check if permission already granted
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      if (existingStatus === Location.PermissionStatus.GRANTED) {
        await getLocation();
        return;
      }

      // If not granted, request permission
      const response = await Location.requestForegroundPermissionsAsync();
      setPermissionResponse(response);

      if (response.status !== Location.PermissionStatus.GRANTED) {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await getLocation();
    })();
  }, []);

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg("Error getting location");
      console.error("Error getting location:", error);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        {permissionResponse?.status === Location.PermissionStatus.DENIED && (
          <Text style={styles.settingsText} onPress={openSettings}>
            Open Settings to enable location permissions
          </Text>
        )}
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Your Location"
        description="This is your current position"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  settingsText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
  },
});

export default LocationMap;
