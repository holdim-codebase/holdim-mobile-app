import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import numeral from 'numeral'
import {useQuery} from '@apollo/client'

import {TUser} from '../../types'
import {GET_USER_INFO, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import styles from './styles'

function ProfileScreen({navigation}: any) {
  const [portfolio, setPortfolio] = React.useState<TUser>()
  const [refreshing, setRefreshing] = React.useState(false)

  const {refetch: refetchUserData} = useQuery(GET_USER_INFO, {
    fetchPolicy: 'cache-and-network',
    variables: {onlyMain: true},
    onCompleted: res => {
      setPortfolio(res.me)
      setRefreshing(false)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetchUserData()
  }

  return (
    <ScrollView
      style={styles.profileWrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {portfolio && (
        <View>
          <View style={styles.profileInfoWrapper}>
            <Image
              style={styles.profileImage}
              source={{uri: portfolio.avatarUrl}}
            />
            <View style={styles.profileInfoTextWrapper}>
              <Text style={styles.profileName}>{portfolio.wallet.address}</Text>
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
                  onPress={() => openDAODescription(followedDao.id)}>
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
                              +followedDao.tokens[0].personalizedData.quantity /
                              followedDao.tokens[0].totalSupply
                            ).toFixed(3)}
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
                          +followedDao.tokens[0].personalizedData.quantity === 0
                            ? followedDao.tokens[0].personalizedData.quantity
                            : '< 0.01'}
                        </Text>{' '}
                        1INCH
                      </Text>
                      <Text style={styles.assetDaoPrice}>
                        {numeral(followedDao.tokens[0].price).format('0[.]00')}{' '}
                        USD
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  )
}

export default ProfileScreen
