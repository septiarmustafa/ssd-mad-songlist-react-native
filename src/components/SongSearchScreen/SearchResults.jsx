import React from 'react';
import { View, SectionList } from 'react-native';
import SectionHeader from './SectionHeader';
import SongItem from './SongItem';

const SearchResults = ({ searchResults, favorites, toggleFavoriteLocally, navigateToDetail, isFavorite }) => {
  const renderItem = ({ item }) => (
    <SongItem
      item={item}
      isFavorite={() => isFavorite(item.trackId, favorites)}
      toggleFavoriteLocally={toggleFavoriteLocally}
      navigateToDetail={navigateToDetail}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  return (
    <SectionList
      sections={searchResults}
      keyExtractor={(item) => item.trackId ? item.trackId.toString() : Math.random().toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoDataFound description="There are no songs found. Please search for a song." />
        </View>
      }
    />
  );
};

export default SearchResults;