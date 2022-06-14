import React from 'react';
import {Movie} from '../interfaces/movie.interface';
import {View, Text, FlatList} from 'react-native';
import MoviePosterComponent from './MoviePoster.component';

interface Props {
  title: string;
  movies: Movie[];
}

const HorizontalSliderComponent = ({title, movies}: Props) => {
  return (
    <View>
      <Text style={{fontSize: 30, fontWeight: 'bold', color:"black", marginBottom:5, marginLeft:10}}>
        {title}
      </Text>
      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MoviePosterComponent movie={item} width={100} height={150} />
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />
    </View>
  );
};

export default HorizontalSliderComponent;
