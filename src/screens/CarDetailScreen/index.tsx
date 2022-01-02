import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  //   SafeAreaView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {width, SPACING} from '../../styles';
import {colors, buttons} from '../DealCarScreen/vwcars';
import RowButton from '../../components/common/RowButton';

// import {
// SharedElement,
// SharedElementTransition,
// nodeFromRef
// } from 'react-navigation-shared-element';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

const animation = {
  0: {opacity: 0, translateX: 50},
  1: {opacity: 1, translateX: 0},
};

// const SPACING = 20;
// const BG_COLOR = 'C1CEE077';

import {RootStackParamList} from '../types';
// import {ScrollView} from 'react-native-gesture-handler';
// import RawButton from '../../components/common/RawButton';

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, 'CarDetail'>;

// const CarDetail = ({navigation, route}) => {
const CarDetailScreen = () => {
  //   console.log(route);
  const navigation = useNavigation<RootStackParamList>();
  const route = useRoute<CarDetailScreenRouteProp>();
  const item = route?.params?.item;

  //   const [currentIndex, setCurrentIndex] = useState(null);
  //   const ref = useRef();
  return (
    <SafeAreaView
      style={{
        // borderWidth: 1,
        // borderColor: 'red',
        flex: 1,
      }}>
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 12,
          position: 'absolute',
          //   top: SPACING * 2,
          right: 0,
          zIndex: 2,
          //   borderWidth: 1,
        }}
        color={'#333'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* <Image style={styles.image} source={{uri: item.image}} /> */}
      <SharedElement id={`item.${item.key}.image`}>
        <Image style={styles.image} source={{uri: item.image}} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.model`}>
          <Text style={styles.model} numberOfLines={1} adjustsFontSizeToFit>
            {item.model}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.description`}>
          <Text style={styles.description}>{item.description}</Text>
        </SharedElement>
      </View>
      <AnimatableScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          marginVertical: 8,
          // marginVertical: SPACING
        }}
        contentContainerStyle={{
          //   padding: SPACING,
          padding: 12,
          // backgroundColor: 'red'
          //   marginVertical:SPACING
        }}>
        {colors.map(color => {
          return (
            <View
              style={[styles.swatch, {backgroundColor: color}]}
              key={color}
            />
          );
        })}
      </AnimatableScrollView>
      {buttons.map((text, index) => {
        return <RowButton text={text} key={index} />;
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 1.8,
    height: width,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: 16,
    // marginRight: SPACING,
    marginRight: 12,
  },
  meta: {
    position: 'absolute',
    // top: SPACING * 4,
    top: SPACING,
    left: SPACING * 0.5,
    width: width * 0.6,
    // borderWidth: 1,
  },
  model: {
    fontSize: 32,
    fontWeight: '700',
    position: 'absolute',
  },
  description: {
    fontSize: 12,
    // fontWeight: '700',
    opacity: 0.7,
    position: 'absolute',
    top: 42 + SPACING / 2,
  },
});

CarDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  console.log('sharedElements', route);
  return [
    {id: `item.${item.key}.image`},
    {id: `item.${item.key}.model`},
    {id: `item.${item.key}.description`},
    // `item.${item.key}.image`,
    // `item.${item.key}.model`,
    // `item.${item.key}.description`,
  ];
};
// DetailScreen.sharedElements = (route, otherRoute, showing) => [
//   {id: 'image'},
//   {id: 'text', animation: 'fade'},
// ];
// CarDetailScreen.sharedElements = (navigation: any, otherRoute, showing) => {
//   const item = navigation.getparam('item');
//   console.log('sharedElements', item);
//   return [
//     // {id: `item.${item.key}.image`},
//     // {id: `item.${item.key}.model`},
//     // {id: `item.${item.key}.description`},
//     `item.${item.key}.image`,
//     `item.${item.key}.model`,
//     `item.${item.key}.description`,
//   ];
// };

export default CarDetailScreen;
