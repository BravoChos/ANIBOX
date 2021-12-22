import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {height, width} from '../../styles';
import {API_KEY} from '../../api/config';
import {RootStackParamList} from '../types';
import Genres from '../../components/movie/Genres';
import Rating from '../../components/movie/Rating';
import Backdrop from '../../components/movie/Backdrop';

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: String) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: String) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface movie {
  id: Number;
  original_title: String;
  poster_path: String;
  backdrop_path: String;
  vote_average: Number;
  overview: String;
  release_date: String;
  genre_ids: [Number];
}

export const getMovies = async () => {
  const {data, status, statusText} = await axios.get(API_URL);

  if (!data?.results)
    return {
      status,
      error: statusText,
      data: null,
    };

  const movies = data.results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: movie) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre: Number) => genres[genre]),
    }),
  );

  return movies;
};

const MovieScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getMovies().then(r => {
      console.log(r);
    });
  }, []);

  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    getMovies().then(movies => {
      if (movies?.length > 0) {
        setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
      }
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      bounces={false}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        // data={movies}
        // keyExtractor={item => item.key}
        horizontal={true}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={{height: 660}}
        scrollEventThrottle={16}>
        <>
          {/* <SafeAreaView
            style={{
              position: 'absolute',
              zIndex: 2,
              // width,
              // backgroundColor: 'green',
              borderWidth: 1,
            }}>
            <View
              style={{
                // position: 'absolute',
                zIndex: 2,
                paddingTop: 8,
                paddingHorizontal: 18,
                // flex: 1,
                width: '100%',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('onPress');
                  navigation.goBack();
                }}
                style={{
                  height: 30,

                  borderWidth: 1,
                  borderRadius: 4,

                  backgroundColor: 'white',
                  // width,
                  // alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    borderRadius: 4,
                    padding: 4,
                    // width: '10%',
                    color: '#277ffd',
                  }}>
                  Previous
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView> */}

          {movies.map((item, index) => {
            if (!item.poster) {
              return <View style={{width: EMPTY_ITEM_SIZE}} />;
            }

            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              // (index + 1) * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [140, 100, 140],
              extrapolate: 'clamp',
            });

            return (
              <View style={{width: ITEM_SIZE, height: '100%'}}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    transform: [{translateY}],
                    backgroundColor: 'white',
                    borderRadius: 34,
                  }}>
                  <Image
                    source={{uri: item.poster}}
                    style={styles.posterImage}
                  />
                  <Text style={{fontSize: 24}} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Rating rating={item.rating} />
                  <Genres genres={item.genres} />
                  <Text style={{fontSize: 12}} numberOfLines={3}>
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            );

            // return (
            //   <View
            //     style={{
            //       width: 100,
            //       height: 100,
            //       backgroundColor: 'red',
            //     }}></View>
            // );
          })}
        </>
      </Animated.ScrollView>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
});
