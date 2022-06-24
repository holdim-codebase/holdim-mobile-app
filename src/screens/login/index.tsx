import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'

import {createUser, handleHTTPError} from '../../services/api'
import styles from './styles'

const LoginScreen = ({navigation}: any) => {
  const [walletAddressInput, onChangeWalletAddressInput] =
    React.useState<string>()
  const [incorrectWalletAddress, setIncorrectWalletAddress] =
    React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const userRegister = async () => {
    if (!walletAddressInput) {
      return
    }
    try {
      setLoading(true)
      await createUser(walletAddressInput).then(() => {
        setLoading(false)
        navigation.navigate('MainScreen')
      })
    } catch (error: any) {
      setLoading(false)
      console.log(error.response.status)
      handleHTTPError()
      onChangeWalletAddressInput('')
    }
  }

  const anonymousSignIn = async () => {
    try {
      await auth().signInAnonymously()
      await userRegister()
    } catch (e: any) {
      console.error(e)
    }
  }

  // validate wallet address when user write it
  // TODO do it with mobix when you add it
  React.useEffect(() => {
    const regexPunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
    const regexSpace = /\s/g

    if (walletAddressInput) {
      if (
        !walletAddressInput.startsWith('0x') ||
        regexPunctuation.test(walletAddressInput) ||
        regexSpace.test(walletAddressInput) ||
        walletAddressInput.length < 40 ||
        walletAddressInput.length > 45
      ) {
        setIncorrectWalletAddress(true)
      } else {
        setIncorrectWalletAddress(false)
      }
    }
  }, [walletAddressInput])

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
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default LoginScreen
