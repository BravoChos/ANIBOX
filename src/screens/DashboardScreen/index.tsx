import React, {useRef, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Transition, Transitioning} from 'react-native-reanimated';
// import 'react-native-gesture-handler';

import data from './data';

import {RootStackParamList} from '@anibox/screens/types';
import LoadingIndicator from '@anibox/components/common/LoadingIndicator';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const DashboardScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
      {/* <StatusBar hidden /> */}
      {/* <LoadingIndicator size={100} /> */}
      {data.map(({bg, color, title, subTitle, descriptions, screen}, index) => {
        // console.log(screen);
        return (
          <TouchableOpacity
            key={screen}
            onPress={() => {
              ref.current.animateNextTransition();
              // setCurrentIndex(index === currentIndex ? null : index);
              if (index === currentIndex) {
                navigation.push(screen);
                setCurrentIndex(null);
              } else {
                setCurrentIndex(index);
              }
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}>
            <View style={[styles.card, {backgroundColor: bg}]}>
              <Text style={[styles.heading, {color}]}>{title}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  <Text style={[styles.subtitle, {color}]}>{subTitle}</Text>
                  {descriptions?.map(description => (
                    <Text key={description} style={[styles.body, {color}]}>
                      {description}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 20 * 2,
    textAlign: 'center',
    fontWeight: '700',
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
    // height: 500,
  },
});
