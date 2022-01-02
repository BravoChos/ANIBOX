import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/* RootStack */
export type RootStackParamList = {
  Dashboard: undefined;
  Movie: undefined;
  Words: undefined;
  DealCar: undefined;
  CarDetail: {
    item: any;
  };
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
