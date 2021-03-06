import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {RootStackParamList} from '@anibox/types';
import DashboardScreen from './DashboardScreen';
import MovieScreen from './MovieScreen';
import WordsScreen from './WordsScreen';
import DealCarScreen from './DealCarScreen';
import CarDetailScreen from './CarDetailScreen';
import GalleryScreen from './GalleryScreen';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Words" component={WordsScreen} />
      <Stack.Screen name="DealCar" component={DealCarScreen} />
      <Stack.Screen name="CarDetail" component={CarDetailScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
