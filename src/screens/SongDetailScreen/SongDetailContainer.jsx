import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import AppBar from '../../components/AppBar';
import SongDetailCard from '../../components/SongDetailScreen/SongDetailCard';

const SongDetailContainer = ({ route }) => {
  const { song } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Song Detail" />
      <SongDetailCard song={song} />
    </SafeAreaView>
  );
};

export default SongDetailContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WEAK_COLOR,
  },
});
