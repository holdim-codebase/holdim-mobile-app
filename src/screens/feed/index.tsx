import * as React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import {useQuery} from '@apollo/client'

import {TProposal, TPoll} from '../../types'
import {GET_POLL, GET_PROPOSALS, handleHTTPError} from '../../services/api'
import styles from './styles'

export const convertURIForLogo = (logoURI: string) => {
  return logoURI.startsWith('ipfs://')
    ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    : logoURI
}

function FeedScreen({navigation}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [polls, setPolls] = React.useState<TPoll[]>([])
  const dateNow = new Date()

  const {loading: loadingProposals, refetch: refetchGetProposals} = useQuery(
    GET_PROPOSALS,
    {
      fetchPolicy: 'cache-and-network',
      variables: {onlyFollowedDaos: true},
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

  const {loading: loadingPoll} = useQuery(GET_POLL, {
    variables: {onlyFollowedDaos: true},
    onCompleted: res => {
      setPolls(res.proposals)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const openProposal = (proposal: TProposal, poll?: TPoll) => {
    navigation.navigate('Proposal', {proposal, poll})
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetchGetProposals()
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  return (
    <ScrollView
      style={styles.feedWrapper}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || loadingProposals}
          onRefresh={onRefresh}
          tintColor={'white'}
          titleColor={'#8463DF'}
          colors={['#8463DF']}
          progressBackgroundColor={'white'}
        />
      }>
      {loadingProposals || refreshing
        ? null
        : proposals &&
          proposals.map((item, i) => {
            const poll = polls[i]
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => openProposal(item, poll)}>
                <View style={styles.proposalWrapper}>
                  <View style={styles.proposalImageWrapper}>
                    <TouchableWithoutFeedback
                      onPress={() => openDAODescription(item.dao.id)}>
                      <Image
                        source={{
                          uri: convertURIForLogo(item.dao.logo),
                        }}
                        style={styles.proposalImage}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.proposalContentWrapper}>
                    <TouchableWithoutFeedback
                      onPress={() => openDAODescription(item.dao.id)}>
                      <Text style={styles.proposalTitle}>{item.dao.name}</Text>
                    </TouchableWithoutFeedback>
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
                      {loadingPoll ? (
                        <View style={styles.loadingWrapper}>
                          <ActivityIndicator size="large" color="#8463DF" />
                        </View>
                      ) : (
                        poll &&
                        poll.poll.choices &&
                        poll.poll.choices.map(
                          (choiceTitle: string, i: number) => {
                            return (
                              <View
                                key={i}
                                style={styles.proposalVotingItemWrapper}>
                                <View
                                  style={styles.proposalVotingItemTextWrapper}>
                                  <Text style={styles.proposalVotingItemText}>
                                    {choiceTitle}
                                  </Text>
                                  <Text style={styles.proposalVotingItemText}>
                                    {numeral(poll.poll.scores[i]).format(
                                      '0[.]0a',
                                    )}{' '}
                                    {poll.poll.symbol}
                                    {'  '}
                                    {
                                      +(
                                        (poll.poll.scores[i] * 100) /
                                        poll.poll.scores_total
                                      ).toFixed()
                                    }
                                    %
                                  </Text>
                                </View>
                                <View
                                  style={
                                    styles.proposalVotingItemBackgroundLine
                                  }>
                                  <View
                                    style={{
                                      ...styles.proposalVotingItemInnerLine,
                                      backgroundColor: '#8463DF',
                                      width: `${
                                        (poll.poll.scores[i] * 100) /
                                        poll.poll.scores_total
                                      }%`,
                                    }}
                                  />
                                </View>
                              </View>
                            )
                          },
                        )
                      )}
                      {!loadingPoll && poll && poll.poll.quorum !== 0 && (
                        <View style={styles.proposalVotingItemTextWrapper}>
                          <Text style={styles.proposalVotingItemText}>
                            Quorum
                          </Text>
                          <Text style={styles.proposalVotingItemText}>
                            {numeral(poll && poll.poll.scores_total).format(
                              '0[.]0a',
                            )}
                            /
                            {numeral(poll && poll.poll.quorum).format('0[.]0a')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
    </ScrollView>
  )
}

export default FeedScreen
