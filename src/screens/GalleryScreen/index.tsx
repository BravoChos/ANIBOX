import React, {useEffect, useState} from 'react';
import {StatusBar, Text, FlatList, Image, View, StyleSheet} from 'react-native';
import {width, height} from '../../styles';
import {API_KEY} from './config';
// Pexels.com API
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

import {getImagesFromPixcels} from '../../api/gallery';

const GalleryScreen = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getImagesFromPixcels().then(items => {
      // console.log(items, 'sdfljsdhfkljhs');
      setImages(items);
    });
  }, []);

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
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            console.log(item?.src?.portrait, 1111);
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
