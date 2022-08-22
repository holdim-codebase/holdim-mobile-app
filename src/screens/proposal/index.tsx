import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import {useLazyQuery} from '@apollo/client'

import {TPool, TProposal} from '../../types'
import {GET_POOL, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'
import {openLinkInAppBrowser} from '../../components/MarkdownText'
import Link from '../../assets/images/svg/Link.svg'
import styles from './styles'

export const shortenAddress = (address: string) => {
  if (address.length <= 12) return address

  const start = address.slice(0, 6)
  const end = address.slice(address.length - 4, address.length)
  const result = start + '...' + end
  return result
}

function ProposalScreen({route, navigation}: any) {
  const [proposal, setProposal] = React.useState<TProposal>(
    route.params.proposal,
  )
  const [pool, setPool] = React.useState<TPool>(
    route.params.pool ? route.params.pool : null,
  )

  const [getPool, {loading: loadingPool}] = useLazyQuery(GET_POOL, {
    context: {clientName: 'splashClient'},
    onCompleted: res => {
      setPool(res.proposals[0])
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const openFullProposal = (proposal: TProposal) => {
    navigation.navigate('FullProposal', {proposal})
  }

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  React.useEffect(() => {
    if (route.params.proposal && route.params.pool) {
      setProposal(route.params.proposal)
      setPool(route.params.pool)
    } else {
      getPool({
        variables: {
          daoId: proposal.snapshotId,
        },
      })
    }
  }, [proposal])

  return (
    <ScrollView style={styles.proposalWrapper}>
      {route.params.proposal ? (
        <View style={styles.proposalWrapper}>
          <TouchableOpacity onPress={() => openDAODescription(proposal.dao.id)}>
            <View style={styles.proposalTopSectionWrapper}>
              <Image
                style={styles.proposalIcon}
                source={{uri: convertURIForLogo(proposal.dao.logo)}}
              />
              <Text style={styles.proposalDaoTitle}>{proposal.dao.name}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Text style={styles.proposalDescription}>TL:DR (AI translated)</Text>
          <Text style={styles.proposalDescription}>
            {proposal.middleDescription}
          </Text>
          <TouchableOpacity onPress={() => openFullProposal(proposal)}>
            <View style={styles.proposalButton}>
              <Text style={styles.proposalButtonText}>Read full version</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.proposalLinksButtonWrapper}>
            {proposal.snapshotLink ? (
              <TouchableWithoutFeedback
                onPress={() => openLinkInAppBrowser(proposal.snapshotLink)}>
                <View
                  style={
                    proposal.discussionLink
                      ? styles.proposalLinkButton
                      : styles.proposalLinkButtonAlone
                  }>
                  <Text style={styles.proposalButtonText}>
                    Vote on Snapshot
                  </Text>
                  <View style={styles.proposalLinkSvg}>
                    <Link />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            {proposal.discussionLink ? (
              <TouchableWithoutFeedback
                onPress={() => openLinkInAppBrowser(proposal.discussionLink)}>
                <View
                  style={
                    proposal.snapshotLink
                      ? styles.proposalLinkButton
                      : styles.proposalLinkButtonAlone
                  }>
                  <Text style={styles.proposalButtonText}>Go to forum</Text>
                  <View style={styles.proposalLinkSvg}>
                    <Link />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <View style={styles.proposalMetaWrapper}>
            <View style={styles.proposalMeta}>
              <Text style={styles.proposalMetaTitle}>Starts:</Text>
              <Text style={styles.proposalMetaInfo}>
                {moment(new Date(proposal.startAt)).format(
                  'MMM DD, YYYY, HH:MM A',
                )}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <Text style={styles.proposalMetaTitle}>End:</Text>
              <Text style={styles.proposalMetaInfo}>
                {moment(new Date(proposal.endAt)).format(
                  'MMM DD, YYYY, HH:MM A',
                )}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <Text style={styles.proposalMetaTitle}>Author:</Text>
              <Text style={styles.proposalMetaInfo}>
                {shortenAddress(proposal.author)}
              </Text>
            </View>
            <View style={styles.proposalMeta}>
              <Text style={styles.proposalMetaTitle}>Total voters:</Text>
              <Text style={styles.proposalMetaInfo}>{pool && pool.votes}</Text>
            </View>
          </View>
          <View style={styles.proposalVotingWrapper}>
            {loadingPool ? (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator size="large" color="#8463DF" />
              </View>
            ) : (
              pool &&
              pool.choices.map((choiceTitle: string, i: number) => (
                <View key={i} style={styles.proposalVotingItemWrapper}>
                  <View style={styles.proposalVotingItemTextWrapper}>
                    <Text style={styles.proposalVotingItemText}>
                      {choiceTitle}
                    </Text>
                    <Text style={styles.proposalVotingItemText}>
                      {numeral(pool.scores[i]).format('0[.]0a')} {pool.symbol}
                      {'  '}
                      {pool.scores_total !== 0
                        ? +((pool.scores[i] * 100) / pool.scores_total).toFixed(
                            2,
                          )
                        : 0}
                      %
                    </Text>
                  </View>
                  <View style={styles.proposalVotingItemBackgroundLine}>
                    <View
                      style={{
                        ...styles.proposalVotingItemInnerLine,
                        backgroundColor: '#8463DF',
                        width: `${
                          pool.scores_total && pool.scores_total !== 0
                            ? (pool.scores[i] * 100) / pool.scores_total
                            : null
                        }%`,
                      }}
                    />
                  </View>
                </View>
              ))
            )}
            {pool && pool.quorum !== 0 && (
              <View style={styles.proposalVotingItemTextWrapper}>
                <Text style={styles.proposalVotingItemText}>Quorum</Text>
                <Text style={styles.proposalVotingItemText}>
                  {numeral(pool && pool.scores_total).format('0[.]0a')}/
                  {numeral(pool && pool.quorum).format('0[.]0a')}
                </Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <Text style={{color: 'white'}}>No</Text>
      )}
    </ScrollView>
  )
}

export default ProposalScreen
