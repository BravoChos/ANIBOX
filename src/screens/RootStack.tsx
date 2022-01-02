import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import DashboardScreen from './DashboardScreen';
import MovieScreen from './MovieScreen';
import WordsScreen from './WordsScreen';
import DealCarScreen from './DealCarScreen';
import CarDetailScreen from './CarDetailScreen';

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
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Words" component={WordsScreen} />
      <Stack.Screen name="DealCar" component={DealCarScreen} />
      <Stack.Screen name="CarDetail" component={CarDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
