import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
import {API_KEY} from '../../api/config';
import {RootStackParamList} from '../types';
import Genres from '../../components/movie/Genres';
import Rating from '../../components/movie/Rating';

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
const BACKDROP_HEIGHT = height * 0.65;

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
  // (API_URL).then(x => x.json());
  if (!data?.results)
    return {
      status,
      error: statusText,
      data: null,
    };
  //
  // console.log(results);
  // return null;
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
    // axios.get(API_URL).then(r => {
    //   console.log(r);
    //   console.log('object');
    // });
    getMovies().then(r => {
      console.log(r);
    });
  }, []);

  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    getMovies().then(r => {
      if (r?.length > 0) {
        setMovies(r);
      }
    });
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <Text>MovieScreen</Text>
    // </SafeAreaView>
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.key}
        horizontal
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
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          console.log(item?.key);
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, 40],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{translateY}],
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}>
                <Image source={{uri: item.poster}} style={styles.posterImage} />
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
        }}
      />
    </View>
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
