import * as React from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import TextAnimator from '../../components/words/TextAnimator';

const DealCarScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text>DealCarScreen</Text>
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
export default DealCarScreen;
