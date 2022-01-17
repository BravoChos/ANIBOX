import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const SPACING = 8;

export default ({text, onPress}: {text: string; onPress?: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.textSize}>{text}</Text>
        <AntDesign name="arrowright" color="rgba(0,0,0,0.8)" size={14} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    padding: SPACING * 2,
    justifyContent: 'space-between',
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  textSize: {fontSize: 14},
});
