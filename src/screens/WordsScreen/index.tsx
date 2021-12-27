import * as React from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';

const WordsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text>Words Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 14,
  },
});
export default WordsScreen;
