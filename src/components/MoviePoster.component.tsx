import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movie.interface';

interface Props {
  movie: Movie;
  width: number;
  height: number;
}

const MoviePosterComponent = ({ movie, width, height }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate('DetailScreen', movie)}
      activeOpacity={0.8}
      style={{
        width,
        height,
        paddingBottom: 20,
        paddingHorizontal: 7
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri }} />
      </View>
    </TouchableOpacity>
  );
};

export default MoviePosterComponent;

// ESTILOS

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 10,
  },
});
