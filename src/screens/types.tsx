import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/* RootStack */
export type RootStackParamList = {
  Dashboard: undefined;
  Movie: undefined;
  Words: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
