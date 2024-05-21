import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const Card = ({ title, description, color, methods, navigation }) => {
  const navigateToMethod = () => {
    navigation.navigate(methods);
  };
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={navigateToMethod}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '20%',
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginTop: 10, // Add spacing between title and description
  },
});

export default Card;
