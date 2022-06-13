import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import useMoviesHook from '../hooks/useMovies.hook';
import MoviePosterComponent from '../components/MoviePoster.component';
import HorizontalSliderComponent from '../components/HorizontalSlider.component';
// import Carousel from 'react-native-snap-carousel';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {peliculasCine, isLoading} = useMoviesHook();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={70}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={{marginTop: top + 20}}>
      {/* CARRUSEL PRINCIPAL */}
      <View style={{height: 500, padding: 15}}>
        <Carousel
          data={peliculasCine}
          renderItem={({item}: any) => (
            <MoviePosterComponent movie={item} width={300} height={450} />
          )}
          sliderWidth={windowWidth}
          itemWidth={300}
        />
      </View>

      {/* CARRUSEL PELICULAS POPULARES */}
      <HorizontalSliderComponent
        title="Peliculas populares"
        movies={peliculasCine}
      />
    </View>
  );
};

export default HomeScreen;
