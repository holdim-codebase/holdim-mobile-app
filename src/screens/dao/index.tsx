import * as React from 'react'
import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native'
import {useQuery} from '@apollo/client'
import numeral from 'numeral'

import {TDAO} from '../../types'
import {GET_DAO_DETAIL, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import MarkdownText from '../../components/MarkdownText'
import styles from './styles'

function DAOScreen({route}: any) {
  const [dao, setDao] = React.useState<TDAO>()

  const {loading: loadingDao} = useQuery(GET_DAO_DETAIL, {
    variables: {
      ids: [route.params.daoId],
      onlyMain: true,
    },
    onCompleted: res => {
      setDao(res.daos[0])
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  return loadingDao ? (
    <View style={styles.loadingWrapperFullScreen}>
      <ActivityIndicator size="large" color="#8463DF" />
    </View>
  ) : dao ? (
    <ScrollView style={styles.daoWrapper}>
      <View style={styles.daoInfoWrapper}>
        <Image
          style={styles.daoImage}
          source={{uri: convertURIForLogo(dao.logo)}}
        />
        <View style={styles.daoInfoTextWrapper}>
          <Text style={styles.daoName}>{dao.name} </Text>
          <Text style={styles.daoUserDetail}>
            {
              +(
                dao.tokens[0].personalizedData.quantity /
                dao.tokens[0].totalSupply
              ).toFixed(3)
            }
            % shares
          </Text>
          <Text style={styles.daoUserDetail}>
            In your wallet:
            <Text style={styles.daoUserAmount}>
              {' '}
              {numeral(dao.tokens[0].personalizedData.quantity).format(
                '0[.]00',
              )}{' '}
              1INCH
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.daoTitleDescription}>Overview</Text>
        <MarkdownText text={dao.overview} />
      </View>
      <View>
        <Text style={styles.daoTitleDescription}>Token forms</Text>
        <MarkdownText text={dao.tokenOverview} />
      </View>
    </ScrollView>
  ) : null
}

export default DAOScreen
