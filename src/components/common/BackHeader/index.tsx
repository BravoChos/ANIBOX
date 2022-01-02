import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {RootStackParamList} from '../../../screens/types';

const BackHeader = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.backBtnWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.textWrapper}>
          <AntDesign name="arrowleft" color="rgba(0,0,0,0.8)" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
    // zIndex: 2,
    height: 40,
    paddingHorizontal: 18,

    // borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  //   backBtnWrapper: {
  //     zIndex: 2,
  //     position: 'absolute',
  //     //   paddingTop: 8,
  //     //   paddingHorizontal: 18,
  //     //   width: '100%',
  //     //   alignItems: 'flex-start',
  //   },
  //   textWrapper: {height: 30, borderRadius: 4, justifyContent: 'center'},
  textStyle: {
    borderRadius: 4,
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
  },
});
