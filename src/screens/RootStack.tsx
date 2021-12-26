import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import DashboardScreen from './DashboardScreen';
import MovieScreen from './MovieScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        // options={{title: 'Homes'}}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        // options={{title: 'Homes'}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
