import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Cast} from '../interfaces/movie.interface';

interface Props {
  actor: Cast;
}

const CastComponent = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <View style={style.container}>
      {actor.profile_path ? (
        <Image
          source={{uri}}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
      ) : null}

      <View style={style.actorInfo}>
        <Text> {actor.name}</Text>
        <Text> {actor.character}</Text>
      </View>
    </View>
  );
};

export default CastComponent;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor:'white',
    height: 50,
    paddginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    paddingRight:10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 9,
    elevation: 4,

    marginRight:10
  },

  actorInfo: {
    marginLeft: 10,
  },
});
