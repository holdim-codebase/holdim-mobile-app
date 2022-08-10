import * as React from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {useQuery} from '@apollo/client'
import SearchBar from 'react-native-dynamic-search-bar'
import numeral from 'numeral'

import {TDAO} from '../../types'
import {GET_DAO_LIST, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import styles from './styles'
import Follow from '../../components/Follow'

function SearchScreen({navigation}: any) {
  const [daoListAll, setDaoListAll] = React.useState<TDAO[]>([])
  const [daoList, setDaoList] = React.useState<TDAO[]>([])

  const {loading: loadingDaoList} = useQuery(GET_DAO_LIST, {
    variables: {
      onlyMain: true,
    },
    onCompleted: res => {
      setDaoListAll(res.daos)
      setDaoList(res.daos)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const getSearchedDaoList = (text?: string) => {
    if (text) {
      const filteredDaoList = daoListAll.filter(dao =>
        dao.name.toLowerCase().includes(text.toLowerCase()),
      )
      setDaoList(filteredDaoList)
    } else {
      setDaoList(daoListAll)
    }
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  return (
    <View style={styles.searchWrapper}>
      <SearchBar
        style={styles.searchBar}
        textInputStyle={styles.searchBarText}
        searchIconImageStyle={{tintColor: 'white'}}
        clearIconImageStyle={{tintColor: 'white'}}
        placeholderTextColor="white"
        placeholder="Search for DAO"
        onChangeText={(text: string) => getSearchedDaoList(text)}
        onClearPress={() => setDaoList(daoListAll)}
      />
      {loadingDaoList ? (
        <View style={styles.loadingWrapperFullScreen}>
          <ActivityIndicator size="large" color="#8463DF" />
        </View>
      ) : (
        <ScrollView style={styles.searchListWrapper}>
          {daoList.length !== 0 ? (
            daoList.map((dao, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => openDAODescription(dao.id)}>
                  <View style={styles.searchDaoWrapper}>
                    <View style={styles.searchDaoLogoTextWrapper}>
                      <Image
                        style={styles.searchDaoLogo}
                        source={{uri: convertURIForLogo(dao.logo)}}
                      />
                      <View style={styles.searchDaoTextWrapper}>
                        <Text style={styles.searchDaoName}>{dao.name}</Text>
                        {dao.tokens && dao.tokens.length ? (
                          <Text style={styles.searchDaoPrice}>
                            {dao.tokens[0].symbol} |{' '}
                            {numeral(dao.tokens[0].price).format('0[.]00')} USD
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.searchDaoFollowSvg}>
                      <Follow
                        daoId={dao.id}
                        userFollowed={dao.personalizedData.followed}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          ) : (
            <View style={styles.searchEmptyWrapper}>
              <Text style={styles.searchEmptyTitle}>Project not found</Text>
              <Text style={styles.searchEmptyText}>
                We're sorry, but we couldn't find the project you mentioned. We
                advise you to check the name of the project and try again.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  )
}

export default SearchScreen
