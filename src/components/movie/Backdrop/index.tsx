import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const BACKDROP_HEIGHT = height * 1;

const Backdrop = ({movies, scrollX}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}>
        {movies.map((item, index) => {
          if (!item?.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate: 'clamp',
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={backDropStyles(translateX).imageWrapper}
              key={'backdrop' + index}>
              <Image source={{uri: item.backdrop}} style={styles.imageStyle} />
            </Animated.View>
          );
        })}
      </ScrollView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={styles.gradientStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: BACKDROP_HEIGHT, width, position: 'absolute'},
  imageStyle: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
  gradientStyle: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
});

const backDropStyles = translateX =>
  StyleSheet.create({
    imageWrapper: {
      position: 'absolute',
      width: translateX,
      height,
      overflow: 'hidden',
    },
  });

export default Backdrop;
