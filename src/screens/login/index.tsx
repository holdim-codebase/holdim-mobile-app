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
import {axiosInstance} from '../../config'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>('')
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const validateWalletAddress = () => {
    // TODO add more validation
    if (walletAddressInput.startsWith('0x')) {
      setIncorrectWalletAddress(false)
      anonymousSignIn()
    } else {
      setIncorrectWalletAddress(true)
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
      await auth().signInAnonymously()
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
          <View style={styles.loginBottom}>
            <View style={styles.loginTitleWrapper}>
              <Text style={styles.loginTitle}>
                Start your friendly DAO journey
              </Text>
            </View>
            <Text
              style={[
                styles.loginDescriptionTitle,
                incorrectWalletAddress &&
                  styles.loginIncorrectWalletAddressText,
              ]}>
              {!incorrectWalletAddress
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
                incorrectWalletAddress &&
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
