import React from 'react';
import currencyFormatter from 'currency-formatter';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MovieFull, Cast} from '../interfaces/movie.interface';
import CastComponent from './Cast.component';

interface Props {
  movieFull: MovieFull;
  castDetail: Cast[];
}

const MoviesDetailComponent = ({movieFull, castDetail}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 15}}>
        <Text>-{movieFull.genres.map(genre => genre.name).join(', ')}</Text>

        <View style={{flexDirection: 'row'}}>
          <View style={[style.marginContainer, {flexDirection: 'row'}]}>
            {[0, 1, 2, 3, 4].map(element => {
              return (
                <Icon
                  style={{marginRight: 5}}
                  key={element}
                  name="star-outline"
                  color="green"
                  size={20}
                />
              );
            })}

            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green'}}>
              {movieFull.vote_average}
            </Text>
          </View>
        </View>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Historia
        </Text>
        <Text>{movieFull.overview}</Text>

        <Text style={{marginTop: 10}}>
          <Text style={{fontWeight: 'bold'}}>Presupuesto:</Text>{' '}
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Actores
        </Text>

        <FlatList
          data={castDetail}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastComponent actor={item} />}
          horizontal= {true} 
          showsHorizontalScrollIndicator={false}
          style={{marginTop:10, height:65, marginBottom: 150 }}/>
      </View>
    </>
  );
};

export default MoviesDetailComponent;

const style = StyleSheet.create({
  marginContainer: {
    marginTop: 15,
  },
});
