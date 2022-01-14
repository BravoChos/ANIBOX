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

export type CarDetailScreenParmaList = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  StackNavigationProp<StackParamList>
>;

// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {StackNavigationProp} from '@react-navigation/stack';
// /* RootStack */
// export type RootStackParamList = {
//   Dashboard: undefined;
//   Movie: undefined;
//   Words: undefined;
//   DealCar: undefined;
//   CarDetail: {
//     item: any;
//   };
//   Gallery: undefined;
// };

// type StackParamList = {};

// export type RootStackNavigationProp = CompositeNavigationProp<
//   NativeStackNavigationProp<RootStackParamList>,
//   StackNavigationProp<StackParamList>
// >;

// //   import { CompositeNavigationProp } from '@react-navigation/native';
// // import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// // import { StackNavigationProp } from '@react-navigation/stack';

// // type ProfileScreenNavigationProp = CompositeNavigationProp<
// //   BottomTabNavigationProp<TabParamList, 'Profile'>,
// //   StackNavigationProp<StackParamList>
// // >;
