import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {axiosInstance} from '../../config'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>('')
  const [incorrectWalletNumber, setIncorrectWalletNumber] =
    React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const validateWalletAddress = () => {
    // TODO add more validation
    if (walletAddressInput.startsWith('0x')) {
      setIncorrectWalletNumber(false)
      anonymousSignIn()
    } else {
      setIncorrectWalletNumber(true)
    }
  }

  const userRegister = async () => {
    try {
      setLoading(true)
      await axiosInstance
        .post('/user/register', walletAddressInput)
        .then(() => {
          setLoading(false)
          navigation.navigate('MainScreen')
        })
    } catch (e: any) {
      setLoading(false)
      Alert.alert('Something went wrong', 'Please try again', [
        {
          text: 'Ok',
          onPress: () => {
            onChangeWalletAddressInput('')
          },
        },
      ])
    }
  }

  const anonymousSignIn = async () => {
    try {
      const res = await auth().signInAnonymously()
      await AsyncStorage.setItem('User ID', res.user.uid)
      userRegister()
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <SafeAreaView style={styles.loginWrapper}>
      <StatusBar backgroundColor={'#161616'} />
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#8463DF" />
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.loginTitle}>
              Start your friendly DAO journey
            </Text>
          </View>
          <View style={styles.loginBottom}>
            <Text
              style={[
                styles.loginDescriptionTitle,
                incorrectWalletNumber && styles.loginIncorrectWalletAddressText,
              ]}>
              {!incorrectWalletNumber
                ? 'Please enter your wallet address or ENS name below'
                : 'Wallet address or ENS you entered is not correct'}
            </Text>
            <FlatList
              style={{paddingBottom: 8}}
              data={[
                {key: '1', title: 'Starts with 0x'},
                {key: '2', title: 'Starts with 0x'},
                {key: '3', title: 'Starts with 0x'},
              ]}
              renderItem={({item}) => (
                <Text style={styles.loginDescription}>
                  {'\u2022' + '  '}
                  {item.title}
                </Text>
              )}
            />
            <TextInput
              style={[
                styles.loginTextInput,
                incorrectWalletNumber &&
                  styles.loginIncorrectWalletAddressInput,
              ]}
              onChangeText={onChangeWalletAddressInput}
              value={walletAddressInput}
              placeholder={'Enter your wallet address'}
              placeholderTextColor="#FFFFFF"
            />
            <View style={styles.loginBtnGoWrapper}>
              <TouchableOpacity
                style={styles.loginBtnGo}
                onPress={validateWalletAddress}>
                <Text style={styles.loginBtnGoTitle}>GO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default LoginScreen
