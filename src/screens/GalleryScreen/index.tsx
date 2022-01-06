import React, {useEffect, useState, useRef} from 'react';
import {
  StatusBar,
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {width, height} from '../../styles';
import {API_KEY} from './config';
// Pexels.com API
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

import {getImagesFromPixcels} from '../../api/gallery';
const IMAGE_SIZE = 80;
const SPACING = 10;

const GalleryScreen = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getImagesFromPixcels().then(items => {
      console.log(items, 'sdfljsdhfkljhs');
      setImages(items);
    });
  }, []);

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    // scroll flatlists
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  if (!images) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {images ? (
        <>
          <FlatList
            ref={topRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={ev => {
              scrollToActiveIndex(
                Math.floor(ev.nativeEvent.contentOffset.x / width),
              );
            }}
            data={images}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => {
              // console.log(item?.src?.portrait, 1111);
              // return <View></View>;
              return (
                <View style={{width, height}}>
                  <Image
                    source={{uri: item?.src?.portrait}}
                    style={{
                      // borderWidth: 1,
                      // position: 'absolute',
                      width,
                      height,
                    }}
                  />
                </View>
              );
            }}
          />
          <FlatList
            ref={thumbRef}
            horizontal
            // pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingHorizontal: SPACING}}
            style={{position: 'absolute', bottom: IMAGE_SIZE}}
            renderItem={({item, index}) => {
              // console.log(item?.src?.portrait, 1111);
              // return <View></View>;
              return (
                <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                  <Image
                    source={{uri: item?.src?.portrait}}
                    style={{
                      // borderWidth: 1,
                      // position: 'absolute',
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                      borderRadius: 12,
                      marginRight: SPACING,
                      borderWidth: 2,
                      borderColor:
                        activeIndex === index ? '#fff' : 'transparent',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 14,
  },
  buttonStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
  },
});
export default GalleryScreen;
