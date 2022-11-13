import * as React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import {useLazyQuery, useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'
import messaging from '@react-native-firebase/messaging'
import 'react-native-get-random-values'
import '@ethersproject/shims'
import WasaSdk from 'wasa-sdk'

import {TProposal, TPoll, TVoting} from '../../types'
import {
  GET_POLL,
  GET_PROPOSALS,
  GET_USER_VOTING,
  handleHTTPError,
} from '../../services/api'
import styles from './styles'
import DoneSVG from '../../assets/images/svg/done.svg'
import {requestUserNotificationPermission} from '../../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {openLinkInAppBrowser} from '../../components/MarkdownText'

export const convertURIForLogo = (logoURI: string) => {
  return logoURI.startsWith('ipfs://')
    ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    : logoURI
}

WasaSdk.account.generate()

function FeedScreen({navigation}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [polls, setPolls] = React.useState<TPoll[]>([])

  // states for pagination
  const [endCursor, setEndCursor] = React.useState<string>('')
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)

  const [userVoting, setUserVoting] = React.useState<TVoting[]>([])

  const [selectedChoice, setSelectedChoice] = React.useState<number>()

  const [userWalletAddress, setUserWalletAddress] = React.useState<string>('')

  const dateNow = new Date()

  const testedProposal = {
    id: '777777777',
    dao: {
      id: '239583902',
      name: 'Flat Earth DAO',
      logo: 'https://cdn.kqed.org/wp-content/uploads/sites/35/2019/12/flat-earth.jpg',
      personalizedData: {followed: true},
    },
    snapshotId: '04593049503053',
    title: 'The Earth is Flat',
    juniorDescription:
      'The proposal is about deciding the fate of the future discussions about Earth being flat. There are a lof of allegations and misinformation about the shape of Earth but we want to reconfirm that the share is flat.',
    endAt: '1668371647833',
    startAt: '1668198847833',
  }

  const testedPoll = {
    id: '459049305983',
    poll: {
      scores: [],
      choices: ['Yes', 'Maybe yes, maybe no'],
    },
  }

  const {
    loading: loadingProposals,
    fetchMore: fetchMoreProposals,
    refetch: refetchGetProposals,
  } = useQuery(GET_PROPOSALS, {
    fetchPolicy: 'cache-and-network',
    variables: {first: 8, after: '', onlyFollowedDaos: true},
    onCompleted: res => {
      const proposalsArray = res.proposalsV2.edges.map(
        (edge: {node: any}) => edge.node,
      )
      setProposals([testedProposal, ...proposalsArray])
      setEndCursor(res.proposalsV2.pageInfo.endCursor)
      setHasNextPage(res.proposalsV2.pageInfo.hasNextPage)
      setRefreshing(false)
    },
    onError: error => {
      // Sentry.captureException(error)
      Sentry.captureException(error)
      handleHTTPError()
    },
  })

  const [getUserVoting] = useLazyQuery(GET_USER_VOTING, {
    context: {clientName: 'snapshot'},
    variables: {
      proposals: [
        '0x7c181ca20f18086f44c1f1ac3589131c2307be4175cd7459f4da4b42b135a130',
      ],
      voter: 'nakrmili.eth',
    },
    onCompleted: res => {
      setUserVoting(res.votes)
    },
    onError: error => {
      console.error(error)
      Sentry.captureException(error)
      handleHTTPError()
    },
  })

  // fetch poll separately from proposals
  // because can get more time due to getting data from another server
  const {loading: loadingPoll, fetchMore: fetchMorePoll} = useQuery(GET_POLL, {
    variables: {first: 8, after: '', onlyFollowedDaos: true},
    onCompleted: res => {
      const pollArr = res.proposalsV2.edges.map(
        (edge: {node: any}) => edge.node,
      )
      setPolls([testedPoll, ...pollArr])
    },
    onError: error => {
      // Sentry.captureException(error)
      Sentry.captureException(error)
      handleHTTPError()
    },
  })

  const openProposal = (proposal: TProposal, poll?: TPoll) => {
    navigation.navigate('Proposal', {proposal, poll})
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetchGetProposals({first: 8, after: '', onlyFollowedDaos: true})
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 900
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  // IOS
  // Request user permission for notification
  React.useEffect(() => {
    messaging.AuthorizationStatus.NOT_DETERMINED === -1
      ? requestUserNotificationPermission()
      : null
  }, [])

  React.useEffect(() => {
    AsyncStorage.getItem('userWalletAddress').then(value => {
      if (value !== null) {
        setUserWalletAddress(value)
      }
    })
  }, [])

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
      }
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          if (hasNextPage) {
            fetchMoreProposals({
              variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
            })
            fetchMorePoll({
              variables: {first: 8, after: endCursor, onlyFollowedDaos: true},
            })
          }
        }
      }}
      scrollEventThrottle={400}>
      {loadingProposals || refreshing
        ? null
        : proposals &&
          proposals.map((item: TProposal, i: number) => {
            const poll = polls[i]
            const votedProposal = userVoting.find(
              v => v.proposal.id === item.snapshotId,
            )
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  setSelectedChoice(undefined)
                  openProposal(item, poll)
                }}>
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
                      {dateNow < new Date(item.endAt)
                        ? 'Ends:'
                        : 'Voting ended on'}{' '}
                      {moment(new Date(item.endAt)).format(
                        'MMM DD, YYYY, HH:MM A',
                      )}
                    </Text>
                    {i !== 0 ? (
                      <View style={styles.proposalVotingWrapper}>
                        {loadingPoll ? (
                          <View style={styles.loadingWrapper}>
                            <ActivityIndicator size="large" color="#8463DF" />
                          </View>
                        ) : poll &&
                          poll.poll.choices &&
                          poll.poll.choices.length !== 0 ? (
                          poll.poll.choices.map(
                            (choiceTitle: string, i: number) => {
                              return (
                                <View
                                  key={i}
                                  style={styles.proposalVotingItemWrapper}>
                                  <View
                                    style={
                                      styles.proposalVotingItemTextWrapper
                                    }>
                                    <Text style={styles.proposalVotingItemText}>
                                      {choiceTitle}
                                    </Text>
                                    <Text style={styles.proposalVotingItemText}>
                                      {numeral(poll.poll.scores[i]).format(
                                        '0[.]0a',
                                      )}{' '}
                                      {poll.poll.symbol}
                                      {'  '}
                                      {poll.poll.scores_total !== 0
                                        ? +(
                                            (poll.poll.scores[i] * 100) /
                                            poll.poll.scores_total
                                          ).toFixed(2)
                                        : 0}
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
                                          poll.poll.scores_total
                                            ? (poll.poll.scores[i] * 100) /
                                              poll.poll.scores_total
                                            : 0
                                        }%`,
                                      }}
                                    />
                                  </View>
                                </View>
                              )
                            },
                          )
                        ) : null}
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
                              {numeral(poll && poll.poll.quorum).format(
                                '0[.]0a',
                              )}
                            </Text>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        {poll &&
                          poll.poll.choices &&
                          poll.poll.choices.length !== 0 &&
                          poll.poll.choices.map((choiceTitle, i) => (
                            <TouchableOpacity
                              key={i}
                              style={[
                                styles.choiceButton,
                                (selectedChoice === i + 1 ||
                                  (votedProposal &&
                                    votedProposal.choice === i + 1)) &&
                                  styles.selectedChoiceButton,
                              ]}
                              onPress={() => setSelectedChoice(i + 1)}>
                              {selectedChoice === i + 1 && <DoneSVG />}
                              <Text style={styles.voteButtonText}>
                                {choiceTitle}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        <TouchableOpacity
                          onPress={async () => {
                            try {
                              const userWalletIsDelegated =
                                userWalletAddress !== '' &&
                                (await WasaSdk.voting.snapshot.isDelegated(
                                  userWalletAddress,
                                ))
                              const delegatedAddress =
                                await WasaSdk.account.getAddress()
                              if (userWalletIsDelegated) {
                                await WasaSdk.voting.snapshot
                                  .vote(
                                    'nakrmili.eth',
                                    '0x7c181ca20f18086f44c1f1ac3589131c2307be4175cd7459f4da4b42b135a130',
                                    1,
                                  )
                                  .then(() => getUserVoting())
                              } else {
                                await openLinkInAppBrowser(
                                  `https://pair.holdim.to/?address=${delegatedAddress}`,
                                )
                              }
                            } catch (e) {
                              return console.error(e)
                            }
                          }}
                          style={
                            selectedChoice && !votedProposal
                              ? styles.voteButton
                              : styles.voteButtonDisabled
                          }
                          disabled={
                            selectedChoice && !votedProposal ? false : true
                          }>
                          <Text style={styles.voteButtonText}>Vote</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
    </ScrollView>
  )
}

export default FeedScreen
