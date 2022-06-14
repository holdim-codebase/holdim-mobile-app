import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
  searchWrapper: {
    flex: 1, 
  },
  searchImageWrapper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  searchImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: 15
  }
})

export default styles