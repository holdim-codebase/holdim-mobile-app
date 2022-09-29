import * as React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {SafeAreaView} from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'
import {useMutation} from '@apollo/client'
import * as Sentry from '@sentry/react-native'

import {handleHTTPError, REGISTER_USER} from '../../services/api'
import styles from './styles'

// to validate wallet address and ens address
import namehash from '@ensdomains/eth-ens-namehash'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>()
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)
  const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)

  const [register] = useMutation(REGISTER_USER, {
    variables: {
      walletAddress: walletAddressInput,
    },
    onCompleted: data => {
      data.registerUser.wallets.length !== 0 &&
        AsyncStorage.setItem('wallet-id', data.registerUser.wallets[0].id)
      // navigate to screens depends on already launched
      AsyncStorage.getItem('alreadyLaunched').then(launched => {
        if (launched !== null) {
          navigation.navigate('MainScreen')
        } else {
          AsyncStorage.setItem('alreadyLaunched', 'true')
          navigation.navigate('WelcomeScreen')
        }
      })
      AsyncStorage.setItem('userLoggedIn', 'true')
      setLoadingScreen(true)
    },
    onError: error => {
      Sentry.captureException(error)
      setLoadingScreen(false)
      handleHTTPError()
      onChangeWalletAddressInput('')
    },
  })

  const anonymousSignIn = async () => {
    if (!walletAddressInput) {
      setIncorrectWalletAddress(true)
      return
    }
    setLoadingScreen(true)
    try {
      await auth()
        .signInAnonymously()
        .then(r => {
          register({
            variables: {walletAddress: walletAddressInput.toLowerCase()},
          })
        })
    } catch (error: any) {
      Sentry.captureException(error)
      setLoadingScreen(false)
    }
  }

  // validate wallet address when user write it
  React.useEffect(() => {
    if (!walletAddressInput) return
    const correctWalletAddress =
      walletAddressInput.length < 255 &&
      walletAddressInput.startsWith('0x') &&
      !walletAddressInput.includes('.')
    const correctENS = walletAddressInput.endsWith('.eth')
    setIncorrectWalletAddress(!(correctWalletAddress || correctENS))

    // if input contains unsupported char -> return error and set incorrect wallet
    try {
      namehash.normalize(walletAddressInput)
    } catch (e) {
      console.error(e)
      setIncorrectWalletAddress(true)
    }
  }, [walletAddressInput])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.loginWrapper}>
        {loadingScreen ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#8463DF" />
          </View>
        ) : (
          <ScrollView>
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
              {incorrectWalletAddress &&
                'Wallet address you entered is not correct'}
            </Text>
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
                style={[
                  styles.loginBtnGo,
                  incorrectWalletAddress || walletAddressInput === undefined
                    ? styles.loginBtnGoDisabled
                    : null,
                ]}
                disabled={
                  incorrectWalletAddress || walletAddressInput === undefined
                    ? true
                    : false
                }
                onPress={anonymousSignIn}>
                <Text style={styles.loginBtnGoTitle}>GO</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
