import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home.screen';
import DetailScreen from '../screens/Detail.screen';

const {Screen, Navigator} = createStackNavigator();

const Navigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Detalles" component={DetailScreen} />
      {/* <Screen name="Profile" component={Profile} /> */}
      {/* <Screen name="Settings" component={Settings} /> */}
    </Navigator>
  );
};

export default Navigation;
