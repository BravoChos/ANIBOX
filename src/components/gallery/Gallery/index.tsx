import React from 'react';
import {Image, View} from 'react-native';
import {width, height} from '../../../styles';

export default ({uri}: {uri: string}) => {
  return (
    <View style={{width, height}}>
      <Image
        source={{uri}}
        style={{
          width,
          height,
        }}
      />
    </View>
  );
};
