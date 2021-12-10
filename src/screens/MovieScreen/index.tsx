import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackParamList} from '../types';

const MovieScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>MovieScreen</Text>
    </SafeAreaView>
  );
};

export default MovieScreen;
