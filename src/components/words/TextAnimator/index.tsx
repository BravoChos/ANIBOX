import React, {useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RootCombinedStackNavigationProp} from '@anibox/types';
const TextAnimator = ({content, duration, style, textStyle}) => {
  const navigation = useNavigation<RootCombinedStackNavigationProp>();
  let animatedValues: any[] = [];
  let animatedFooterValue = new Animated.Value(0);

  const textArr = content.trim().split('\n');
  textArr.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  const animated = (toValue = 1) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration: duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(
      toValue === 0 ? duration / 40 : duration / 5,
      toValue === 0 ? animations.reverse() : animations,
    ).start(() => {
      if (toValue) {
        animatedFooters(1);
      } else {
        animated(1);
      }
    });
  };

  const animatedFooters = (toValue = 1) => {
    Animated.timing(animatedFooterValue, {
      toValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animated();
  }, []);

  return (
    <>
      <View style={[style, styles.textWrapper]}>
        {textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                textStyle,
                {
                  opacity: animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        animatedValues[index],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}>
              {word}
              {`${index < textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            animated(0);
            animatedFooters(0);
          }}>
          <Animated.Text
            style={[
              {
                opacity: animatedFooterValue,
              },
              styles.buttonStyle,
            ]}>
            Reset
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Animated.Text
            style={[
              {
                opacity: animatedFooterValue,
              },
              styles.buttonStyle,
            ]}>
            Go back
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TextAnimator;

const styles = StyleSheet.create({
  footer: {
    marginTop: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
