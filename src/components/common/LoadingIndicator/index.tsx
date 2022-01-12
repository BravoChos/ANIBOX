import * as React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
// import {MotiView} from '@motify/components';
import {MotiView} from 'moti';
import {width, height} from '@anibox/styles';

export default ({size}: {size: number}) => {
  // console.log(size, 'hello');
  return (
    <View
      style={{
        width,
        height,
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <MotiView
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 0,
          shadowOpacity: 0.5,
        }}
        animate={{
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          borderWidth: size / 10,
          shadowOpacity: 1,
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          // repeat: 3,
          // repeat: Infinity,
          loop: true,
          // repeatReverse: false,
        }}
        style={{
          width: size,
          height: size,
          borderWidth: size / 10,
          borderRadius: size / 2,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      />
    </View>
  );
};
