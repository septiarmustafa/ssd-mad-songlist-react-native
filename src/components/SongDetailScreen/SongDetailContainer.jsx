import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../../utils/Colors';

const SongDetailContainer = ({ route }) => {
  const { song } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Song Detail</Text>
      </View>
      <View style={styles.card}>
      <Text style={styles.title}>Song Detail</Text>
      <Text style={styles.text}>Song: {song.trackName || 'No track name available'}</Text>
      <Text style={styles.text}>Artist: {song.artistName}</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
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

export default SongDetailContainer;
