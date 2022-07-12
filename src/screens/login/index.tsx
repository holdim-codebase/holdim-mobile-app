import * as React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'
import {useMutation} from '@apollo/client'

import {handleHTTPError, REGISTER_USER} from '../../services/api'
import styles from './styles'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>()
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)
  const [loadingScreen, setLoadingScreen] = React.useState<boolean>(false)

  const [register, {loading}] = useMutation(REGISTER_USER, {
    variables: {
      walletAddress: walletAddressInput,
    },
    onCompleted: ({data}) => {
      navigation.navigate('MainScreen')
      setLoadingScreen(loading)
    },
    onError: error => {
      console.log(error)
      setLoadingScreen(loading)
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
      await auth().signInAnonymously()
      await register({variables: {walletAddress: walletAddressInput}})
      setLoadingScreen(false)
    } catch (e: any) {
      console.error(e)
      setLoadingScreen(false)
    }
  }

  // validate wallet address when user write it
  React.useEffect(() => {
    walletAddressInput && walletAddressInput.length > 255
      ? setIncorrectWalletAddress(true)
      : setIncorrectWalletAddress(false)
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
              {!incorrectWalletAddress
                ? 'Please enter your wallet address or ENS name below'
                : 'Wallet address or ENS you entered is not correct'}
            </Text>
            <Text style={styles.loginDescription}>
              {'\u2022' + '  '}Starts with 0x
            </Text>
            <Text style={styles.loginDescription}>
              {'\u2022' + '  '}Supported only Ethereum address
            </Text>
            <Text style={styles.loginDescription}>
              {'\u2022' + '  '}Usually have 40-44 symbols
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
