import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home.screen';
import DetailScreen from '../screens/Detail.screen';
import { Movie } from '../interfaces/movie.interface';

const { Screen, Navigator } = createStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
};


const Navigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="DetailScreen" component={DetailScreen} />
      {/* <Screen name="Profile" component={Profile} /> */}
      {/* <Screen name="Settings" component={Settings} /> */}
    </Navigator>
  );
};

export default Navigation;
