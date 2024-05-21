import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
const Dashboard = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const data = [
    { id: 1, title: 'Trucks', description: 'Real-Time Road Warriors: The Innovative World of Tracking Trucks', color: 'orange', methods: 'Trucks' },
    { id: 2, title: 'Consignments', description: 'Consignment Services for Safe and Efficient Transportation', color: 'blue', methods: 'CreateConsignments' },
    { id: 3, title: 'SIM Consent', description: 'Register Mobile Number to enable sim tracking', color: 'green', methods: 'Simconsent' },
  ];

  const navigateToComponent = (componentName) => {
    navigation.navigate(componentName);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Do you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage or perform any logout logic
      await AsyncStorage.removeItem('username');
      // Navigate to the Login page after logout
      navigation.navigate('Loginpage');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Adding navigation options inside the component
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null, // This removes the left back indicator
      headerRight: () => (
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          {/* <Icon name="log-out-outline" size={27} color="black" /> */}
        </Pressable>
      ),  
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Card key={item.id} title={item.title} description={item.description} color={item.color} methods={item.methods} navigation={navigation} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    height: '100%',
    overflow: 'scroll',
  },
  logoutButton: {
    marginRight: 10,
  },
});

export default Dashboard;
