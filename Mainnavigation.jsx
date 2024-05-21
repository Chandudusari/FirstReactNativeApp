import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loginpage from './components/Loginpage';
import Trucks from './components/Trucks';
import Dashboard from './components/Dashboard';
import Simconsent from './components/Simconsent';
import CreateConsignments from './components/CreateConsignments';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
enableScreens();
const Stack = createStackNavigator();

export default function MainNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } 
    };

    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Dashboard' : 'Loginpage'}>
        <Stack.Screen name="Loginpage" component={Loginpage} options={{ headerShown: false }} />
        <Stack.Screen name="Trucks" component={Trucks} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={[Dashboard.navigationOptions,{ headerLeft: null}]} />
        <Stack.Screen name="Simconsent" component={Simconsent} />
        <Stack.Screen name="CreateConsignments" component={CreateConsignments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
