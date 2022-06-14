import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movie.interface';

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="red" size={70}></ActivityIndicator>
    </View>
  )
}


export default LoadingComponent;