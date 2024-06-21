import React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import Colors from "../../utils/Colors";
export default SearchBar = ({ onSearchChange, value, handleSearch, isLoading, searchQuery }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10
      }}
    >
      <View style={style.searchInputContainer}>
        <TextInput placeholder="Search Songs" onChangeText={onSearchChange} value={value} />
      </View>
      <Button title="Search" onPress={handleSearch} disabled={isLoading || !searchQuery} />

    </View>
  );
};

const style = StyleSheet.create({
  searchInputContainer: {
    height: 40,
    backgroundColor: Colors.WHITE,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
});
