import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';

import { colors } from '../assets/colors';

GoogleSignin.configure({
  webClientId:
    '791493667669-bprld8v6oq8vo1visa92v733rd0goqfd.apps.googleusercontent.com'
});

export default Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function onGoogleButtonPress() {
    setIsLoading(true);
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.watchContainer}>
          <Text style={styles.watch}>Location Record</Text>
        </View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onGoogleButtonPress}
          disabled={isLoading}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: 75
  },
  watchContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 150
  },
  watch: {
    fontSize: 36,
    textAlign: 'center',
    color: colors.secondary
  },
  inputsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputStyle: {
    width: 300,
    height: 50,
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 1,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    opacity: 0.9,
    color: colors.secondary,
    marginBottom: 16
  },
  passwordReset: {
    fontSize: 18,
    color: colors.secondary,
    alignSelf: 'flex-end'
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 36
  }
});
