import * as React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

import CarList from './CarList';
import BackHeader from '@anibox/components/common/BackHeader';

const DealCarScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackHeader />
      <CarList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DealCarScreen;
