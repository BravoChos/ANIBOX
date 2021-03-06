import React from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

import RowButton from '@anibox/components/common/RowButton';
import {colors, buttons} from '@anibox/screens/DealCarScreen/vwcars';
import {width, SPACING} from '@anibox/styles';

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

const animation = {
  0: {opacity: 0, translateX: 50},
  1: {opacity: 1, translateX: 0},
};

import {
  RootStackParamList,
  RootCombinedStackNavigationProp,
} from '@anibox/types';

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, 'CarDetail'>;

const CarDetailScreen = () => {
  const navigation = useNavigation<RootCombinedStackNavigationProp>();
  const route = useRoute<CarDetailScreenRouteProp>();
  const item = route?.params?.item;

  return (
    <SafeAreaView style={styles.container}>
      <AntDesign
        name="close"
        size={28}
        style={styles.icon}
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
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContainerStyle}>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    padding: 12,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  image: {
    width: width * 1.8,
    height: width,
    resizeMode: 'contain',
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: 16,
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
  scrollViewStyle: {
    flexGrow: 0,
    marginVertical: 8,
  },
  scrollViewContainerStyle: {
    padding: 12,
  },
});

CarDetailScreen.sharedElements = route => {
  const {item} = route.params;
  return [
    {id: `item.${item.key}.image`},
    {id: `item.${item.key}.model`},
    {id: `item.${item.key}.description`},
  ];
};

export default CarDetailScreen;
