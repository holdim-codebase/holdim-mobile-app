import * as React from 'react'
import {Text, View, ScrollView, Image} from 'react-native'
import {useQuery} from '@apollo/client'
import numeral from 'numeral'

import {TDAO} from '../../types'
import {GET_DAO_DETAIL, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import MarkdownText from '../../components/MarkdownText'
import Follow from '../../components/Follow'
import styles from './styles'

function DAOScreen({route}: any) {
  const [dao, setDao] = React.useState<TDAO>()

  useQuery(GET_DAO_DETAIL, {
    fetchPolicy: 'cache-and-network',
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

  return dao ? (
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
                (dao.tokens[0].personalizedData.quantity /
                  dao.tokens[0].totalSupply) *
                100
              ).toFixed(3)
            }
            % shares
          </Text>
          <Text style={styles.daoUserDetail}>
            In your wallet:
            <Text style={styles.daoUserAmount}>
              {' '}
              {+Number(dao.tokens[0].personalizedData.quantity).toFixed(2)}{' '}
              {dao.tokens[0].symbol}
            </Text>
          </Text>
        </View>
        <View style={styles.daoFollowSvg}>
          <Follow daoId={dao.id} userFollowed={dao.personalizedData.followed} />
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
