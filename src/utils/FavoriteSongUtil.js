import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@MyApp:Favorites';

export const getFavoriteSongs = async () => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorite songs:', error);
    return [];
  }
};

export const toggleFavorite = async (song) => {
  try {
    let favorites = await getFavoriteSongs();

    const existingIndex = favorites.findIndex(item => item.trackId === song.trackId);
    if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push(song);
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error toggling favorite song:', error);
  }
};

export const isFavorite = async (trackId) => {
  try {
    const favorites = await getFavoriteSongs();
    return favorites.some(fav => fav.trackId === trackId);
  } catch (error) {
    console.error('Error checking if song is favorite:', error);
    return false;
  }
};
