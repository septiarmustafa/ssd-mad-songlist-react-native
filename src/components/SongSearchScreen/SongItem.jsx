import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Colors from '../../utils/Colors';

const SongItem = ({ item, isFavorite, toggleFavoriteLocally, navigateToDetail }) => (
  <Pressable
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
        <Pressable
          style={[styles.button, isFavorite(item.trackId) ? styles.buttonRemove : styles.buttonAdd]}
          onPress={() => toggleFavoriteLocally(item)}
        >
          <Text style={styles.buttonText}>
            {isFavorite(item.trackId) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </Pressable>
      </View>
    </View>
  </Pressable>
);

export default SongItem;


const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
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
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAdd: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  buttonRemove: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});