import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {useEffect} from 'react';

import useMoviesHook from '../hooks/useMovies.hook';
import MoviePosterComponent from '../components/MoviePoster.component';
import HorizontalSliderComponent from '../components/HorizontalSlider.component';
import LoadingComponent from '../components/Loading.component';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upComing, isLoading} = useMoviesHook();
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (isLoading) return <LoadingComponent />;

  return (
    <ScrollView> 
      <View style={{marginTop: top + 20}}>
        {/* CARRUSEL PRINCIPAL */}
        <View style={{height: 470}}>
          <Carousel
            data={nowPlaying}
            renderItem={({item}: any) => (
              <MoviePosterComponent movie={item} width={300} height={450} />
            )}
            sliderWidth={windowWidth}
            itemWidth={300}
          />
        </View>

        {/* Populares  */}
        <HorizontalSliderComponent
          title="Peliculas populares"
          movies={popular}
        />

        {/* Top Rated */}
        <HorizontalSliderComponent
          title="Top Rated"
          movies={topRated}
        />

        {/* Up coming ---> SIGNO "!" ES PARA DECIRLE CONFIA EN MI YO TE ENVIARE ALGO */}
        <HorizontalSliderComponent
          title="Up coming"
          movies={upComing!}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
