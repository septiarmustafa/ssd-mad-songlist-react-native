import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import { getFavoriteSongs, toggleFavorite } from '../../utils/FavoriteSongUtil';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../../utils/Colors';
import FavoriteSongList from '../../components/FavoriteSongScreen/FavoriteSongList';
import AppBar from '../../components/AppBar';

const FavoriteSongContainer = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    setFavorites(favoriteSongs);
  };

  const handleToggleFavorite = async (song) => {
    await toggleFavorite(song);
    loadFavorites();
  };

  const navigateToDetail = (song) => {
    navigation.navigate('SongDetail', { song }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Favorite Songs" />
      <View style={styles.content}>
        <FavoriteSongList
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onNavigateToDetail={navigateToDetail}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteSongContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WEAK_COLOR,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
