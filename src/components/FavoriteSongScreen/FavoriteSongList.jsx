import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import SongCard from './SongCard';
import NoDataFound from '../NoDataFound';

const FavoriteSongList = ({ favorites, onToggleFavorite, onNavigateToDetail }) => (
  <FlatList
    data={favorites}
    keyExtractor={item => item.trackId.toString()}
    renderItem={({ item }) => (
      <SongCard
        song={item}
        onToggleFavorite={() => onToggleFavorite(item)}
        onPress={() => onNavigateToDetail(item)}
      />
    )}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={
      <View style={styles.noDataContainer}>
        <NoDataFound description="No favorite songs yet." />
      </View>
    }
  />
);

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteSongList;
