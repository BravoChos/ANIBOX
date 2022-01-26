import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

/* RootStack */
export type RootStackParamList = {
  Dashboard: undefined;
  Movie: undefined;
  Words: undefined;
  DealCar: undefined;
  CarDetail: {
    item: any;
  };
  Gallery: undefined;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type StackParamList = {};

export type RootCombinedStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  StackNavigationProp<StackParamList>
>;
