import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const uploadLocation = (latitude, longitude) => {
  const uid = auth().currentUser.uid;
  const timestamp = firestore()._config.statics.FieldValue.serverTimestamp();
  firestore().collection('locations').add({
    uid: uid,
    createdAt: timestamp,
    latitude: latitude,
    longitude: longitude
  });
};

export const fetchHistory = async () => {
  const uid = auth().currentUser.uid;
  const locations = await firestore()
    .collection('locations')
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .limit(30)
    .get()
    .then((querySnapshot) => {
      let history = querySnapshot.docs;
      history = history.map(function (e) {
        e = e._data;
        e.createdAt = e.createdAt.toDate().toDateString();
        return e;
      });
      return history;
    });
  return locations;
};
