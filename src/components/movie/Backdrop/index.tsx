import React from 'react';
import {
  Animated,
  Dimensions,
  // FlatList,
  ScrollView,
  Image,
  Platform,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({movies, scrollX}) => {
  // if (movies.length === 0)
  console.log(movies, 'back');
  // return null;

  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <ScrollView
        // data={movies}
        // keyExtractor={item => item.key + '-backdrop'}
        // horizontal
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        // renderItem={({item, index}) => {
        //   if (!item.backdrop) {
        //     return null;
        //   }
        //   const translateX = scrollX.interpolate({
        //     // inputRange: [index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
        //     inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
        //     // inputRange: [(index - 3) * ITEM_SIZE, (index - 2) * ITEM_SIZE],
        //     outputRange: [0, width],
        //     // outputRange: [-width, 0],
        //     extrapolate: 'clamp',
        //   });
        //   return (
        //     <Animated.View
        //       removeClippedSubviews={false}
        //       style={{
        //         position: 'absolute',

        //         width: translateX,

        //         height,
        //         overflow: 'hidden',
        //       }}>
        //       <Image
        //         source={{uri: item.backdrop}}
        //         style={{
        //           width,
        //           height: BACKDROP_HEIGHT,

        //           position: 'absolute',
        //         }}
        //       />
        //     </Animated.View>
        //   );
        // }}
      >
        {movies.map((item, index) => {
          // console.log({props});
          // const {item, index} = props;
          // renderItem={({item, index}) => {
          console.log(item, 'Sdfsdsf', index);
          if (!item?.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            // inputRange: [index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            // inputRange: [(index - 3) * ITEM_SIZE, (index - 2) * ITEM_SIZE],
            outputRange: [0, width],
            // outputRange: [-width, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',

                width: translateX,

                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,

                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;
