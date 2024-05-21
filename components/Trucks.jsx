import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ListItem from './ListItem'; // Ensure this component is defined and exported correctly
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Trucks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  useEffect(() => {
    if (page > 0 || data.length === 0) { // Ensure fetch is called on initial load
      fetchData();
    }
  }, [page]);

  const loadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('trucksData');
      const storedPage = await AsyncStorage.getItem('trucksPage');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
        //console.log('Loaded data from storage:', JSON.parse(storedData));
      }
      if (storedPage !== null) {
        setPage(JSON.parse(storedPage));
        console.log('Loaded page from storage:', JSON.parse(storedPage));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading data from storage: ', error);
      setLoading(false);
    }
  };

  const saveDataToStorage = async (newData, newPage) => {
    try {
      await AsyncStorage.setItem('trucksData', JSON.stringify(newData));
      await AsyncStorage.setItem('trucksPage', JSON.stringify(newPage));
      console.log('Data saved to storage:', newData, newPage);
    } catch (error) {
      console.error('Error saving data to storage: ', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('https://enmovil.io/haka/common/mobiledeviceslist', {
        parent_organization: 'CARLSBERG',
        plant_name: 'ALWAR',
        keyword: '',
        type: '',
        start_limt: page,
      });
      const filteredData = response.data.records.filter(item => item._id !== null);
      console.log('Fetched data:', filteredData);
      const newData = [...data, ...filteredData];
      setData(newData);
      saveDataToStorage(newData, page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(error.message);
      setLoading(false);
    } finally {
      setIsFetching(false); // Reset isFetching flag after fetching data
    }
  };

  const handleLoadMore = () => {
    if (!isFetching) {
      setIsFetching(true);
      setPage(prevPage => prevPage + 100);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isFetching ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Trucks;
