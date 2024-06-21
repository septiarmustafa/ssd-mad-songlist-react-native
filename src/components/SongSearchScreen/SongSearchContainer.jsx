import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, SectionList, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import SearchSongs from '../../useCases/SearchSong';
import { useNavigation } from '@react-navigation/native';
import { getFavoriteSongs, toggleFavorite, isFavorite } from '../../utils/FavoriteSongUtil';
import Colors from '../../utils/Colors';
import NoDataFound from '../NoDataFound';
import Loading from '../Loading';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigateToDetail(item)}
    >
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/default-image.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text>{item.artworkUrl100}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.trackName || 'No track name available'}</Text>
          <Text style={styles.artist}>Artist: {item.artistName}</Text>
          <Button
            title={isFavorite(item.trackId, favorites) ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={() => toggleFavoriteLocally(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderNoDataFound = () => (
    <NoDataFound description="There are no songs found. Please search for a song." />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>List Songs App</Text>
      </View>
          <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search songs..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} disabled={isLoading || !searchQuery} />
      {isLoading ? <Loading /> : <SectionList
        sections={searchResults}
        keyExtractor={(item) => item.trackId ? item.trackId.toString() : Math.random().toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderNoDataFound}
      /> }
      
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#666666',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    color: Colors.PRIMARY_COLOR
  },
});

export default SongSearchContainer;