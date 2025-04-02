import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';
import RunningExercise from './components/RunningExercise';

const Stack = createNativeStackNavigator();

const exercises = [
  { name: 'Push Ups', type: 'repetition', suggested: { name: 'Bicycling', type: 'duration' } },
  { name: 'Bicycling', type: 'duration', suggested: { name: 'Sit Ups', type: 'repetition' } },
  { name: 'Jumping Jacks', type: 'repetition', suggested: { name: 'Push Ups', type: 'repetition' } },
  { name: 'Running', type: 'running', suggested: { name: 'Jumping Jacks', type: 'repetition' } },
  { name: 'Sit Ups', type: 'repetition', suggested: { name: 'Bicycling', type: 'duration' } },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Exercises' }}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RepetitionExercise" component={RepetitionExercise} />
        <Stack.Screen name="DurationExercise" component={DurationExercise} />
        <Stack.Screen name="RunningExercise" component={RunningExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate(
          item.type === 'repetition'
            ? 'RepetitionExercise'
            : item.type === 'duration'
            ? 'DurationExercise'
            : 'RunningExercise',
          { name: item.name, suggested: item.suggested }
        )
      }
    >
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select an Exercise</Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});

