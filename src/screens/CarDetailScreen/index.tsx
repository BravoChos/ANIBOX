import React from 'react';
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
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

import RowButton from '../../components/common/RowButton';
import {colors, buttons} from '../DealCarScreen/vwcars';
import {width, SPACING} from '../../styles';

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

const animation = {
  0: {opacity: 0, translateX: 50},
  1: {opacity: 1, translateX: 0},
};

import {RootStackParamList} from '../types';

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, 'CarDetail'>;

const CarDetailScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  const route = useRoute<CarDetailScreenRouteProp>();
  const item = route?.params?.item;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 12,
          position: 'absolute',
          right: 0,
          zIndex: 2,
        }}
        color={'#333'}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
        useNativeDriver={true}
        animation={animation}
        delay={300}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          marginVertical: 8,
          // marginVertical: SPACING
        }}
        contentContainerStyle={{
          padding: 12,
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
        return (
          <Animatable.View key={index}>
            <RowButton text={text} />
          </Animatable.View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 1.8,
    height: width,
    resizeMode: 'contain',
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
    top: SPACING,
    left: SPACING * 0.5,
    width: width * 0.6,
  },
  model: {
    fontSize: 32,
    fontWeight: '700',
    position: 'absolute',
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: 'absolute',
    top: 42 + SPACING / 2,
  },
});

CarDetailScreen.sharedElements = route => {
  const {item} = route.params;
  console.log('sharedElements', route);
  return [
    {id: `item.${item.key}.image`},
    {id: `item.${item.key}.model`},
    {id: `item.${item.key}.description`},
  ];
};

export default CarDetailScreen;
