import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

import vwcars from './vwcars';
import {RootCombinedStackNavigationProp} from '@anibox/types';

const ITEM_SIZE = 120;
const SPACING = 20;
const BG_COLOR = '#C1CEE077';

const CarList = () => {
  const navigation = useNavigation<RootCombinedStackNavigationProp>();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={vwcars}
        keyExtractor={item => item.key}
        contentContainerStyle={{padding: SPACING}}
        renderItem={({item}) => {
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
                    <Text
                      style={styles.description}
                      numberOfLines={2}
                      adjustsFontSizeToFit>
                      {item.description}
                    </Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}>
                  <Image
                    style={[
                      {
                        flex: 1,
                        resizeMode: 'center',
                      },
                    ]}
                    source={{uri: item.image}}
                  />
                </SharedElement>
              </View>
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
    overflow: 'hidden',
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
    top: 20 + SPACING / 2,
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: '-45%',
  },
});
