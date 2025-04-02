import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DurationExercise({ route, navigation }) {
  const { name, suggested } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.timer}>Time: {formatTime(seconds)}</Text>

      <View style={styles.buttonWrapper}>
        <Button title={active ? 'Pause' : 'Start'} onPress={() => setActive(!active)} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Reset" onPress={() => { setActive(false); setSeconds(0); }} />
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
  timer: { fontSize: 18, marginBottom: 20 },
  buttonWrapper: { marginVertical: 5, width: '80%' },
});

