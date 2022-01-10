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

import {width, height} from '@anibox/styles';
import {RootStackParamList} from '@anibox/screens/types';
import Genres from '@anibox/components/movie/Genres';
import Rating from '@anibox/components/movie/Rating';
import Backdrop from '@anibox/components/movie/Backdrop';
import LoadingIndicator from '@anibox/components/common/LoadingIndicator';
import {getMovies} from '@anibox/api/movie';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface Movie {
  id: Number;
  title: String;
  poster: String;
  backdrop: String;
  rating: Number;
  description: String;
  release_date: String;
  genres: [Number];
}
type Movies = Movie[];

const MovieScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  const scrollX = useRef(new Animated.Value(0)).current;

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((fetchedMovies: Movies) => {
      if (fetchedMovies?.length > 0) {
        setMovies([
          {title: 'empty-left'},
          ...fetchedMovies,
          {title: 'empty-right'},
        ]);
      }
    });
  }, []);

  if (movies?.length === 0) {
    return <LoadingIndicator size={100} />;
  }

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      bounces={false}>
      <SafeAreaView style={styles.header}>
        <View style={styles.backBtnWrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.textWrapper}>
            <Text style={styles.textStyle}>Previous</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={{height}}
        scrollEventThrottle={16}>
        <>
          {movies.map((item, index) => {
            if (!item.poster) {
              return (
                <View style={{width: EMPTY_ITEM_SIZE}} key={'movie' + index} />
              );
            }

            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [160, 120, 160],
              extrapolate: 'clamp',
            });

            return (
              <View style={styles.cardContainer} key={'movie' + index}>
                <Animated.View
                  style={[
                    styles.cardInnderWrapper,
                    {
                      transform: [{translateY}],
                    },
                  ]}>
                  <Image
                    source={{uri: item.poster}}
                    style={styles.posterImage}
                  />
                  <Text style={styles.titleFontSize} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Rating rating={item.rating} />
                  <Genres genres={item.genres} />
                  <Text style={styles.descriptionFontSize} numberOfLines={2}>
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            );
          })}
        </>
      </Animated.ScrollView>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    position: 'absolute',
    zIndex: 2,
  },
  backBtnWrapper: {
    zIndex: 2,
    paddingTop: 8,
    paddingHorizontal: 18,
    width: '100%',
    alignItems: 'flex-start',
  },
  textWrapper: {height: 30, borderRadius: 4, justifyContent: 'center'},
  textStyle: {
    borderRadius: 4,
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {width: ITEM_SIZE, height: '100%'},
  cardInnderWrapper: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    // transform: [{translateY}],
    backgroundColor: 'white',
    borderRadius: 34,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  titleFontSize: {fontSize: 24},
  descriptionFontSize: {fontSize: 12},
});
