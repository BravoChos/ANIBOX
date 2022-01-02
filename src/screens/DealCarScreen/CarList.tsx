import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  // SafeAreaView,
  FlatList,
  View,
  Image,
} from 'react-native';
// import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
// import {Transition, Transitioning} from 'react-native-reanimated';

import vwcars from './vwcars';
// import {spacing, theme} from './config/data/vwcars';
import {SharedElement} from 'react-navigation-shared-element';
// import {SharedElement} from 'react-navigation-shared-element/build/v4';

const ITEM_SIZE = 120;
const SPACING = 20;
const BG_COLOR = '#C1CEE077';

import {RootStackParamList} from '../types';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {height} from '../../styles';

const CarList = () => {
  const navigation = useNavigation<RootStackParamList>();
  //   const [currentIndex, setCurrentIndex] = useState(null);
  //   const ref = useRef();
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar hidden /> */}
      {/* <Text>CarList</Text> */}
      <FlatList
        data={vwcars}
        keyExtractor={item => item.key}
        contentContainerStyle={{padding: SPACING}}
        renderItem={({item}) => {
          console.log('test', item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CarDetail', {item});
              }}>
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.model`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                </View>
              </View>
              <SharedElement id={`item.${item.key}.image`} style={styles.image}>
                <Image
                  style={{
                    flex: 1,
                    resizeMode: 'center',
                  }}
                  source={{uri: item.image}}
                />
              </SharedElement>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CarList;

const styles = StyleSheet.create({
  item: {
    height: ITEM_SIZE,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    // overflow: 'hidden',
    overflow: 'hidden',
    // position: 'absolute',
  },
  model: {
    fontSize: 18,
    fontWeight: '700',
    position: 'absolute',
  },
  description: {
    fontSize: 12,
    // fontWeight: '700',
    opacity: 0.7,
    position: 'absolute',
    top: (20 + SPACING) / 2,
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: '-40%',
    // resizeMode: 'center',
  },
});
