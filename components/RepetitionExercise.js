import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RepetitionExercise({ route, navigation }) {
  const { name, suggested } = route.params;
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.counter}>Repetitions: {count}</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Increase" onPress={() => setCount(count + 1)} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title={`Do Suggested: ${suggested.name}`}
          onPress={() =>
            navigation.replace(
              suggested.type === 'repetition'
                ? 'RepetitionExercise'
                : suggested.type === 'duration'
                ? 'DurationExercise'
                : 'RunningExercise',
              { name: suggested.name, suggested }
            )
          }
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Home" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  counter: { fontSize: 18, marginBottom: 20 },
  buttonWrapper: { marginVertical: 5, width: '80%' },
});
