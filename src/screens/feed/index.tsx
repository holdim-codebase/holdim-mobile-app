import * as React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import {useLazyQuery} from '@apollo/client'

import {TProposal, TPool} from '../../types'
import {GET_POOL, GET_PROPOSALS, handleHTTPError} from '../../services/api'
import styles from './styles'

export const convertURIForLogo = (logoURI: string) => {
  return logoURI.startsWith('ipfs://')
    ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    : logoURI
}

function FeedScreen({navigation}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [pools, setPools] = React.useState<TPool[]>([])
  const dateNow = new Date()

  const [getProposals, {loading: loadingProposals}] = useLazyQuery(
    GET_PROPOSALS,
    {
      onCompleted: res => {
        setProposals(res.proposals)
        setRefreshing(false)
      },
      onError: error => {
        console.log(error)
        handleHTTPError()
      },
    },
  )

  const [getPool, {loading: loadingPool}] = useLazyQuery(GET_POOL, {
    context: {clientName: 'splashClient'},
    onCompleted: res => {
      setPools(prevState => res.proposals && [...prevState, res.proposals[0]])
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const openProposal = (proposal: TProposal, pool: TPool) => {
    navigation.navigate('Proposal', {proposal, pool})
  }

  const getArrayWithPoolsForProposals = async (snapshotIds: string[]) => {
    for await (const id of snapshotIds) {
      await getPool({
        variables: {
          daoId: id,
        },
      })
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    getProposals()
  }

  const openDAODescription = (daoId: string, followed: boolean) => {
    navigation.navigate('DAO', {daoId, followed})
  }

  React.useEffect(() => {
    if (proposals) {
      const snapshotIds: string[] = []
      proposals.forEach(proposal => snapshotIds.push(proposal.snapshotId))
      setPools([])
      getArrayWithPoolsForProposals(snapshotIds)
    }
  }, [proposals])

  React.useEffect(() => {
    getProposals()
  }, [])

  return (
    <ScrollView
      style={styles.feedWrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loadingProposals ? (
        <View style={styles.loadingWrapperFullScreen}>
          <ActivityIndicator size="large" color="#8463DF" />
        </View>
      ) : (
        proposals &&
        proposals.map((item, i) => {
          const pool = pools[i]
          return (
            <TouchableOpacity key={i} onPress={() => openProposal(item, pool)}>
              <View style={styles.proposalWrapper}>
                <View style={styles.proposalImageWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      openDAODescription(
                        item.dao.id,
                        item.dao.personalizedData.followed,
                      )
                    }>
                    <Image
                      source={{
                        uri: convertURIForLogo(item.dao.logo),
                      }}
                      style={styles.proposalImage}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.proposalContentWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      openDAODescription(
                        item.dao.id,
                        item.dao.personalizedData.followed,
                      )
                    }>
                    <Text style={styles.proposalTitle}>{item.dao.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.proposalDescription}>
                    {item.juniorDescription}
                  </Text>
                  <Text style={styles.proposalEndTime}>
                    {dateNow > new Date(item.endAt)
                      ? 'Ends:'
                      : 'Voting ended on'}{' '}
                    {moment(new Date(item.endAt)).format(
                      'MMM DD, YYYY, HH:MM A',
                    )}
                  </Text>
                  <View style={styles.proposalVotingWrapper}>
                    {loadingPool ? (
                      <View style={styles.loadingWrapper}>
                        <ActivityIndicator size="large" color="#8463DF" />
                      </View>
                    ) : (
                      pool &&
                      pool.choices &&
                      pool.choices.map((choiceTitle: string, i: number) => {
                        return (
                          <View
                            key={i}
                            style={styles.proposalVotingItemWrapper}>
                            <View style={styles.proposalVotingItemTextWrapper}>
                              <Text style={styles.proposalVotingItemText}>
                                {choiceTitle}
                              </Text>
                              <Text style={styles.proposalVotingItemText}>
                                {numeral(pool.scores[i]).format('0[.]0a')}{' '}
                                {pool.symbol}
                                {'  '}
                                {
                                  +(
                                    (pool.scores[i] * 100) /
                                    pool.scores_total
                                  ).toFixed()
                                }
                                %
                              </Text>
                            </View>
                            <View
                              style={styles.proposalVotingItemBackgroundLine}>
                              <View
                                style={{
                                  ...styles.proposalVotingItemInnerLine,
                                  backgroundColor: '#8463DF',
                                  width: `${
                                    (pool.scores[i] * 100) / pool.scores_total
                                  }%`,
                                }}
                              />
                            </View>
                          </View>
                        )
                      })
                    )}
                    {!loadingPool && pool && pool.quorum !== 0 && (
                      <View style={styles.proposalVotingItemTextWrapper}>
                        <Text style={styles.proposalVotingItemText}>
                          Quorum
                        </Text>
                        <Text style={styles.proposalVotingItemText}>
                          {numeral(pool && pool.scores_total).format('0[.]0a')}/
                          {numeral(pool && pool.quorum).format('0[.]0a')}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  )
}

export default FeedScreen
