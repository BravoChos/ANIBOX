import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const SPACING = 8;

export default ({text, onPress}) => {
  // console.log(text);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          padding: SPACING * 2,
          justifyContent: 'space-between',
          borderColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}>
        <Text style={{fontSize: 14}}>{text}</Text>
        <AntDesign name="arrowright" color="rgba(0,0,0,0.8)" size={14} />
      </View>
    </TouchableOpacity>
  );
};
{
  /* <ArrowRightOutlined /> */
}
