// SavingList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const SavingList = ({ entries }) => {
  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.amount}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 16
  }
});

export default SavingList;
