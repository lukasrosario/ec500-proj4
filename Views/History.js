import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';

import LocationItem from '../Components/LocationItem';

import Loading from './Loading';
import ThinButton from '../Components/ThinButton';
import { fetchHistory } from '../util/firestoreUtil';

import { colors } from '../assets/colors';

export default History = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await fetchHistory();
      setData(history);
      setLoading(false);
    };
    loadHistory();
  }, []);

  const createLogout = () => {
    Alert.alert('Are you sure you want to log out?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => auth().signOut() }
    ]);
  };

  if (loading) {
    return <Loading colorOffset />;
  }

  return (
    <View style={styles.container}>
      <ThinButton
        containerStyle={styles.logoutContainer}
        buttonColor={colors.primary}
        textColor={colors.secondary}
        onPress={createLogout}
      >
        Log Out
      </ThinButton>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          contentContainerStyle={styles.listStyle}
          renderItem={({ item }) => <LocationItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.secondary,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 64
  },
  listContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listStyle: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logoutContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12
  }
});
