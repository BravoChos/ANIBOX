import * as React from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import TextAnimator from '../../components/words/TextAnimator';

const WordsScreen = () => {
  const _onFinish = () => {
    // Alert.alert('Animation text', 'Yeah!! It is woriking!');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <TextAnimator
        content={
          'I hope to live with a conscience clear \n until my dying day \n And yet like the windblown leaf \n I have suffered \n                                          \n I must love all those close to death \n with a heart that sings of the stars. \n And take the path \n I have been called to walk \n Even to night, \n the stars are being ruffled by the wind \n                                                \n "Prologue", by Yun, Dong-ju'
        }
        textStyle={styles.textStyle}
        style={styles.containerStyle}
        duration={1400}
        onFinish={_onFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 14,
  },
  buttonStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
  },
});
export default WordsScreen;
