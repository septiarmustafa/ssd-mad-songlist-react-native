import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';

const SongCard = ({ song, onToggleFavorite, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.card}>
      <Image
        source={require("../../../assets/images/default-image.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{song.trackName || 'No track name available'}</Text>
        <Text style={styles.artist}>Artist: {song.artistName}</Text>
        <Pressable style={styles.button} onPress={onToggleFavorite}>
          <Text style={styles.buttonText}>Remove from Favorites</Text>
        </Pressable>
      </View>
    </View>
  </TouchableOpacity>
);

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
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SongCard;
