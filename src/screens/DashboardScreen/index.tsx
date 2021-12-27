import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackParamList} from '../types';

const DashboardScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 18, backgroundColor: 'white'}}>
      <TouchableOpacity
        style={{marginVertical: 8, borderWidth: 1, padding: 4}}
        onPress={() => {
          console.log({navigation});
          navigation.push('Movie');
        }}>
        <Text>MovieScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 8, borderWidth: 1, padding: 4}}
        onPress={() => {
          console.log({navigation});
          navigation.push('Words');
        }}>
        <Text>WordsScreen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
