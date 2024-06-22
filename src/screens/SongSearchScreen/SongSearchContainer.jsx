import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFavoriteSongs, toggleFavorite, isFavorite } from '../../utils/FavoriteSongUtil';
import Colors from '../../utils/Colors';
import Loading from '../../components/Loading';
import SearchSongs from '../../usecases/SearchSong';
import AppBar from '../../components/AppBar';
import SearchResults from '../../components/SongSearchScreen/SearchResults';

const SongSearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const searchSongs = new SearchSongs();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteSongs = await getFavoriteSongs();
      setFavorites(favoriteSongs);
      formatSearchResults(searchResults, favoriteSongs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const formatSearchResults = (results, favoriteSongs) => {
    const formattedResults = results.map(artist => ({
      title: artist.artistName,
      data: artist.songs.map(song => ({
        ...song,
        isFavorite: isFavorite(song.trackId, favoriteSongs)
      }))
    }));
    setSearchResults(formattedResults);
  };

  const isFavorite = (trackId, favoriteSongs) => {
    return favoriteSongs.some(fav => fav.trackId === trackId);
  };

  const toggleFavoriteLocally = async (song) => {
    try {
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.findIndex(fav => fav.trackId === song.trackId);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      } else {
        updatedFavorites.push(song);
      }
      setFavorites(updatedFavorites);
      await toggleFavorite(song);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      loadFavorites();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchSongs.execute(searchQuery);
      if (results) {
        formatSearchResults(results, favorites);
      } else {
        console.warn('No results found.');
      }
    } catch (error) {
      console.error('Error searching songs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDetail = (song) => {
    navigation.navigate('SongDetail', { song }); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WEAK_COLOR }}>
      <AppBar title="List Songs App" />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search songs..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} disabled={isLoading || !searchQuery} />
        {isLoading ? (
          <Loading />
        ) : (
          <SearchResults
            searchResults={searchResults}
            favorites={favorites}
            toggleFavoriteLocally={toggleFavoriteLocally}
            navigateToDetail={navigateToDetail}
            isFavorite={isFavorite}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
  },
});

export default SongSearchContainer;