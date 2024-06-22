import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

const AppBar = ({ title }) => (
  <View style={styles.appBar}>
    <Text style={styles.appBarTitle}>{title}</Text>
  </View>
);

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
    color: Colors.WHITE,
  },
});

export default AppBar;
