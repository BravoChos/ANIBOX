import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {RootCombinedStackNavigationProp} from '@anibox/types';

const BackHeader = ({absolute = false}) => {
  const navigation = useNavigation<RootCombinedStackNavigationProp>();

  return (
    <SafeAreaView
      style={[
        styles.header,
        absolute ? styles.absoluteTrue : styles.absoluteFalse,
      ]}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="rgba(0,0,0,0.8)" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    height: 40,
    paddingHorizontal: 18,
    width: '100%',
    justifyContent: 'center',
  },
  absoluteFalse: {
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  absoluteTrue: {zIndex: 2, position: 'absolute'},
});
