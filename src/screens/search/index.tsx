import * as React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import styles from './styles'

const searchImage = require('../../assets/images/searchScreen.png')


function SearchScreen() {
  return (
    <ScrollView style={styles.searchWrapper}>
        <Image style={styles.searchImage} source={searchImage}/>
    </ScrollView>
  )
}


export default SearchScreen