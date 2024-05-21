import React from 'react'

import { View, Text, StyleSheet } from 'react-native';
const Simconsent = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Text style={[styles.text,{color: 'black',fontSize:13}]}>Simconsent!</Text>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
text: {
  fontSize: 24,
  fontWeight: 'bold',
},
});
export default Simconsent;
