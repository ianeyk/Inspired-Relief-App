import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { get_data } from './get_data';
import React, { useState } from 'react';


import { HelperCard } from './helper_card';
export default function App() {
  const [result, setResult] = useState([]);
  const results = get_data([51.5074, 0.1278]);
  results.then(function(value) {
    setResult(value);
  });
  if (result.length == 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>We found {result.length} Helpers!</Text>
      <StatusBar style="auto" />
      <FlatList data={result} 
      renderItem={({item}) =>
          <View style={styles.cards}>
          <HelperCard {...item}/>
          </View>
        }
        horizontal={true}
        pagingEnabled={true}
        snapToAlignment={"center"}
        // snapToInterval={Dimensions.get('window').width - 100}
        decelerationRate={"fast"}
      />
    </View>
  );
}

window['get_data'] =get_data; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    height:'100%',
    width:'100%',

  },
  item: {
    backgroundColor: '#bdf',
    borderRadius: 3,
  },
  cards: {
    marginLeft: 20,
    marginRight: 20,
  },
  msg: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
  }
});


