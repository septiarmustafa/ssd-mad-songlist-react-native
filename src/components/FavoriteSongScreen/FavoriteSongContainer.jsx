import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet, Image, SafeAreaView} from 'react-native';
import { getFavoriteSongs, toggleFavorite } from '../../utils/FavoriteSongUtil';
import { useNavigation } from '@react-navigation/native'; 
import NoDataFound from '../NoDataFound';
import Colors from '../../utils/Colors';


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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Favorite Songs</Text>
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.trackId.toString()}
          renderItem={({ item }) => (
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
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.trackName || 'No track name available'}</Text>
                  <Text style={styles.artist}>Artist: {item.artistName}</Text>
                  <Button title="Remove from Favorites" onPress={() => handleToggleFavorite(item)} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <NoDataFound description="No favorite songs yet." />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteSongContainer;

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
    padding: 20,
    marginTop: 10,
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
});