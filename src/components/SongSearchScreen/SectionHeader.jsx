import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    color: Colors.PRIMARY_COLOR,
  },
});
