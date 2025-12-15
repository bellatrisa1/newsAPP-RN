// app/screens/BookmarksScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Закладки</Text>
      <Text style={styles.text}>Здесь будут сохраненные статьи</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});