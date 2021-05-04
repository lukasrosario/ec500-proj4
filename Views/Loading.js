import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { colors } from '../assets/colors';

export default Loading = ({ colorOffset }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorOffset ? colors.secondary : colors.primary }
      ]}
    >
      <ActivityIndicator
        color={colorOffset ? colors.primary : colors.secondary}
        size="large"
      />
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
