import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Movie} from '../interfaces/movie.interface';

interface Props {
  movie: Movie;
  width: number;
  height: number;
}

const MoviePosterComponent = ({movie, width, height}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <View
      style={{
        width,
        height,
        marginHorizontal:5,
        borderRadius: 10,
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri}} />
      </View>
    </View>
  );
};

export default MoviePosterComponent;

// ESTILOS

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
  },
});
