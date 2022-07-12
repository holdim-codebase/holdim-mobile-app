import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import numeral from 'numeral'
import {useQuery} from '@apollo/client'

import {TUser} from '../../types'
import {GET_USER_INFO, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import styles from './styles'

function ProfileScreen({navigation}: any) {
  const [portfolio, setPortfolio] = React.useState<TUser>()

  const {loading: loadingUserInfo} = useQuery(GET_USER_INFO, {
    variables: {tokensOnlyMain2: true},
    onCompleted: res => {
      setPortfolio(res.me)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const openDAODescription = (daoId: string, followed: boolean) => {
    navigation.navigate('DAO', {daoId, followed})
  }

  return (
    <View style={styles.profileWrapper}>
      {loadingUserInfo ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#8463DF" />
        </View>
      ) : (
        portfolio && (
          <View>
            <View style={styles.profileInfoWrapper}>
              <Image
                style={styles.profileImage}
                source={{uri: portfolio.avatarUrl}}
              />
              <View style={styles.profileInfoTextWrapper}>
                <Text style={styles.profileName}>
                  {portfolio.wallet.address}
                </Text>
                <Text style={styles.profilePortfolioAmount}>
                  You govern: {portfolio.followedDaos.length} DAOs
                </Text>
              </View>
            </View>
            <ScrollView style={styles.portfolioWrapper}>
              <Text style={styles.portfolioTitle}>Followed</Text>
              <View style={styles.portfolioDaoListWrapper}>
                {portfolio.followedDaos.map(followedDao => (
                  <TouchableOpacity
                    key={followedDao.id}
                    onPress={() => openDAODescription(followedDao.id, true)}>
                    <View style={styles.portfolioDaoWrapper}>
                      <View style={styles.assetLeft}>
                        <Image
                          style={styles.assetImage}
                          source={{uri: convertURIForLogo(followedDao.logo)}}
                        />
                        <View style={styles.assetTextWrapper}>
                          <Text style={styles.assetTitle}>
                            {followedDao.name}
                          </Text>
                          <Text style={styles.assetShareText}>
                            <Text style={styles.assetShareAmount}>
                              {(
                                (+followedDao.tokens[0].personalizedData
                                  .quantity /
                                  followedDao.tokens[0].totalSupply) *
                                100
                              ).toFixed(3)}
                              %
                            </Text>{' '}
                            shares
                          </Text>
                        </View>
                      </View>
                      <View style={styles.assetRight}>
                        <Text style={styles.assetAmountText}>
                          <Text style={styles.assetAmountNumber}>
                            {+followedDao.tokens[0].personalizedData.quantity >=
                              0.01 ||
                            +followedDao.tokens[0].personalizedData.quantity ===
                              0
                              ? followedDao.tokens[0].personalizedData.quantity
                              : '< 0.01'}
                          </Text>{' '}
                          {followedDao.tokens[0].symbol}
                        </Text>
                        <Text style={styles.assetDaoPrice}>
                          {numeral(followedDao.tokens[0].price).format(
                            '0[.]00',
                          )}{' '}
                          USD
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )
      )}
    </View>
  )
}

export default ProfileScreen
