import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {Transition, Transitioning} from 'react-native-reanimated';

// import VWCars from './VWCars';
// import {spacing, theme} from './config/data/vwcars';
// import {
//   SharedElement,
//   // SharedElementTransition,
//   // nodeFromRef
// } from 'react-navigation-shared-element';

const SPACING = 20;
// const BG_COLOR = 'C1CEE077';

import {RootStackParamList} from '../types';

// const CarDetail = ({navigation, route}) => {
const CarDetail = () => {
  const navigation = useNavigation<RootStackParamList>();
  //   const [currentIndex, setCurrentIndex] = useState(null);
  //   const ref = useRef();
  return (
    <SafeAreaView>
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 12,
          position: 'absolute',
          top: SPACING * 2,
          right: 0,
          zIndex: 2,
        }}
        color={'#333'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 20 * 2,
    textAlign: 'center',
    fontWeight: '700',
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
    // height: 500,
  },
});
