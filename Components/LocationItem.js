import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../assets/colors';

export default LocationItem = ({ createdAt, latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{createdAt}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{latitude}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{longitude}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 4
  },
  date: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8
  },
  bottomContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row'
  },
  textContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});
