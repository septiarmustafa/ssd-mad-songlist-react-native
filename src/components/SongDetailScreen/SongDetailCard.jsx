import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SongDetailCard = ({ song }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Song Detail</Text>
    <Text style={styles.text}>Song: {song.trackName || 'No track name available'}</Text>
    <Text style={styles.text}>Artist: {song.artistName}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SongDetailCard;
