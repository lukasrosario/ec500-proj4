import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ThinButton = ({
  containerStyle,
  onPress,
  buttonColor,
  border,
  buttonOverride,
  textColor,
  textOverride,
  children
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: buttonColor,
            borderWidth: border ? 2 : 0,
            borderColor: border ? textColor : 'transparent',
            ...buttonOverride
          }
        ]}
      >
        <Text style={[styles.text, { color: textColor, ...textOverride }]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 36,
    paddingVertical: 12
  },
  text: {
    fontWeight: '300',
    fontSize: 20
  }
});
