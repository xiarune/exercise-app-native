import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function RunningExercise({ route, navigation }) {
  const { name, suggested } = route.params;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const recordLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.timer}>Time: {formatTime(time)}</Text>

      <View style={styles.buttonWrapper}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Record Lap" onPress={recordLap} disabled={!isRunning} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Reset" onPress={reset} />
      </View>

      <Text style={styles.lapTitle}>Laps:</Text>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapText}>Lap {index + 1}: {lap}</Text>
      ))}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  timer: { fontSize: 18, marginBottom: 10 },
  buttonWrapper: { marginVertical: 5, width: '80%' },
  lapTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  lapText: { fontSize: 16 },
});

