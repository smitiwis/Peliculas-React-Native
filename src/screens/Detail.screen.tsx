import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import movieDB from '../api/movieDB';
import { Movie, Cast } from '../interfaces/movie.interface';
import useMovieDetailsHook from '../hooks/useMovieDetails.hook';
import LoadingComponent from '../components/Loading.component';
import MoviesDetailComponent from '../components/MoviesDetail.component';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

const DetailScreen = ({ route }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, movieFull, castDetail } = useMovieDetailsHook(movie.id);

  if (isLoading) return <LoadingComponent />;

  return (
    <ScrollView>
      <View style={style.imageContainer}>
        <View style={style.imageBorder}>
          <Image
            source={{ uri }}
            style={style.posterImage}
          />
        </View>
      </View>

      <View style={style.marginContainer}>
        <Text style={style.subTitle}>{movie.original_title} </Text>
        <Text style={style.title}>{movie.title}</Text>
      </View>

      {
        isLoading 
        ? <LoadingComponent /> 
        : <MoviesDetailComponent movieFull={movieFull!} castDetail={castDetail!} />
      }


    </ScrollView>
  );
};
export default DetailScreen;


const style = StyleSheet.create({

  imageContainer: {
    borderRadius: 30,
    width: '100%',
    height: screenHeight * 0.65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 15
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 25
  },

  posterImage: {
    flex: 1,
    margin: 10,
    borderRadius: 25,

  },

  marginContainer: {
    marginTop: 15,
    marginLeft: 15,
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },

  subTitle: {
    fontSize: 15
  }

})