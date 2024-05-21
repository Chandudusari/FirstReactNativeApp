import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Mainnaviagtion from './Mainnavigation';
export default function App() {
  return (
  <SafeAreaProvider>
    <Mainnaviagtion/>
   </SafeAreaProvider>
  );
}
