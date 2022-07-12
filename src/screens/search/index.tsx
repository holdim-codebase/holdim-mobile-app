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

  const openDAODescription = (daoId: string, followed: boolean) => {
    navigation.navigate('DAO', {daoId, followed})
  }

  return (
    <View style={styles.searchWrapper}>
      <SearchBar
        style={styles.searchBar}
        textInputStyle={{color: 'white', fontSize: 12}}
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
          {daoList &&
            daoList.map((dao, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() =>
                    openDAODescription(dao.id, dao.personalizedData.followed)
                  }>
                  <View style={styles.searchDaoWrapper}>
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
                </TouchableWithoutFeedback>
              )
            })}
        </ScrollView>
      )}
    </View>
  )
}

export default SearchScreen
