import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import moment from 'moment'
import numeral from 'numeral'

import {TPool, TProposal} from '../../types'
import {convertURIForLogo} from '../feed'
import styles from './styles'

function ProposalScreen({route, navigation}: any) {
  const [proposal, setProposal] = React.useState<TProposal>(
    route.params.proposal,
  )
  const [pool, setPool] = React.useState<TPool>(route.params.pool)

  const shortenAddress = (address: string) => {
    if (address.length <= 12) return address

    const start = address.slice(0, 6)
    const end = address.slice(address.length - 4, address.length)
    const result = start + '...' + end
    return result
  }

  const openFullProposal = (proposal: TProposal) => {
    navigation.navigate('FullProposal', {proposal})
  }

  React.useEffect(() => {
    if (route.params.proposal) {
      setProposal(route.params.proposal)
      setPool(route.params.pool)
    }
  }, [proposal])

  return (
    <ScrollView style={styles.proposalWrapper}>
      {route.params.proposal ? (
        <View style={styles.proposalWrapper}>
          <View style={styles.proposalTopSectionWrapper}>
            <Image
              style={styles.proposalIcon}
              source={{uri: convertURIForLogo(proposal.dao.logo)}}
            />
            <Text style={styles.proposalDaoTitle}>{proposal.dao.name}</Text>
          </View>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Text style={styles.proposalDescription}>TL:DR (AI translated)</Text>
          <Text style={styles.proposalDescription}>
            {proposal.middleDescription}
          </Text>
          <TouchableWithoutFeedback onPress={() => openFullProposal(proposal)}>
            <View style={styles.proposalButton}>
              <Text style={styles.proposalButtonText}>Read full version</Text>
            </View>
          </TouchableWithoutFeedback>
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
            {route.params.pool &&
              route.params.pool.choices &&
              route.params.pool.choices.map(
                (choiceTitle: string, i: number) => (
                  <View key={i} style={styles.proposalVotingItemWrapper}>
                    <View style={styles.proposalVotingItemTextWrapper}>
                      <Text style={styles.proposalVotingItemText}>
                        {choiceTitle}
                      </Text>
                      <Text style={styles.proposalVotingItemText}>
                        {numeral(pool.scores[i]).format('0[.]0a')} {pool.symbol}
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
                    <View style={styles.proposalVotingItemBackgroundLine}>
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
                ),
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
