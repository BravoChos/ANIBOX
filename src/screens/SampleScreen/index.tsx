import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {RootStackParamList} from '../types';

const SampleScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <SafeAreaView style={{borderWidth: 1}}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default SampleScreen;
