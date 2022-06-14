import * as React from 'react'
import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native'
import numeral from 'numeral'

import {TPortfolioResponse} from '../../types'

const profileImage = require('../../assets/images/profile.jpg')

import styles from './styles'

function ProfileScreen() {
  const [portfolio, setPortfolio] = React.useState<TPortfolioResponse>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    // console.log('Fetch')
    // try {
    //   setLoading(true)
    //   await getPortfolio().then(res => {
    //     setPortfolio(res)
    //     setLoading(false)
    //   })
    // } catch (e: any) {
    //   setLoading(false)
    //   Alert.alert(
    //     'Something went wrong',
    //     'Please try again',
    //     [
    //       {
    //         text: 'Reload',
    //         onPress: fetchPortfolio
    //       },
    //       {
    //         text: 'Cancel',
    //         onPress: () => {}
    //       },
    //     ]
    //   );
    // }
  }

  return (
    <View style={styles.profileWrapper}>
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#8463DF" />
        </View>
      ) : (
        <View>
          <View style={styles.profileInfoWrapper}>
            <Image style={styles.profileImage} source={profileImage} />
            <View style={styles.profileInfoTextWrapper}>
              <Text style={styles.profileName}>nakrmili.eth</Text>
              <Text style={styles.profilePortfolioAmount}>
                You govern: {portfolio.length} DAOs
              </Text>
            </View>
          </View>
          <Text style={styles.portfolioTitle}>Governance you follow</Text>
          <ScrollView style={styles.portfolioWrapper}>
            {portfolio.map(asset => (
              <View key={asset.title} style={styles.assetWrapper}>
                <View style={styles.assetLeft}>
                  <Image style={styles.assetImage} source={{uri: asset.icon}} />
                  <View style={styles.assetTextWrapper}>
                    <Text style={styles.assetTitle}>{asset.title}</Text>
                    <Text style={styles.assetShare}>
                      {+(asset.share * 100).toFixed(6)}% shares
                    </Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetAmount}>
                    {numeral(asset.amount).format('0[.]00')} {asset.symbol}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen
