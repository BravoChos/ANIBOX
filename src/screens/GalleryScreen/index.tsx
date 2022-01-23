import React, {useState, useRef} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';

import BackHeader from '@anibox/components/common/BackHeader';
import Gallery from '@anibox/components/gallery/Gallery';
import LoadingIndicator from '@anibox/components/common/LoadingIndicator';
import {useImagesFromPixcel} from '@anibox/hooks';
import {width} from '@anibox/styles';

const IMAGE_SIZE = 60;
const SPACING = 10;

const Container = Styled.View`
  flex: 1;
`;

const GalleryScreen = () => {
  const images = useImagesFromPixcel();

  const topRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
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
    return <LoadingIndicator size={100} />;
  }

  return (
    <Container>
      <BackHeader absolute={true} />
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
        renderItem={({item}) => <Gallery uri={item?.src?.portrait} />}
      />
      <FlatList
        ref={thumbRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item: {id: number; src: {portrait: string}}) =>
          item.id.toString()
        }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item?.src?.portrait}}
                style={[styles.image, activeStyles(index, activeIndex).image]}
              />
            </TouchableOpacity>
          );
        }}
        style={styles.wrapper}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: SPACING,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginRight: SPACING,
    borderWidth: 2,
  },
});

const activeStyles = (activeIndex, index) =>
  StyleSheet.create({
    image: {
      borderColor: activeIndex === index ? '#fff' : 'transparent',
    },
  });

export default GalleryScreen;
