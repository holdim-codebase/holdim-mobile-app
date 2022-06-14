import * as React from 'react'
import { Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import { TFeedResponse } from '../../types'

import styles from './styles'

function ProposalScreen({ route, navigation }: any) {

  const [proposal, setProposal] = React.useState<TFeedResponse[0]>()


  React.useEffect(() => {
    if (route.params?.proposal) {
      setProposal(route.params.proposal)
    }
  }, [])

  if (!proposal) return <View />

  const shortenAddress = (address: string) => {
    if (address.length <= 12) return address
  
    const start = address.slice(0, 6)
    const end = address.slice(address.length - 4, address.length)
    const result = start + '...' + end
    return result
  }

  const openFullProposal = (proposal: TFeedResponse[0]) => {
    navigation.navigate('FullProposal', {proposal})
  }
  

  return (
    <ScrollView style={styles.proposalWrapper}>
      {proposal ? 
        <View style={styles.proposalWrapper}>
          <View  style={styles.proposalTopSectionWrapper}>
            <Image style={styles.proposalIcon} source={{ uri: proposal.icon}}/>
            <Text style={styles.proposalDaoTitle}>{proposal.daoTitle}</Text>
          </View>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Text style={styles.proposalDescr}>TL:DR (AI translated)</Text>
          <Text style={styles.proposalDescr}>{proposal.description.short}</Text>
          <TouchableWithoutFeedback onPress={() => openFullProposal(proposal)}>
            <View style={styles.proposalButton}>
            <Text style={styles.proposalButtonText}>Read full version</Text>
            </View>
            </TouchableWithoutFeedback>
          <View style={styles.proposalMetaWrapper}>
            <View style={styles.proposalMeta}><Text style={styles.proposalMetaTitle}>Starts:</Text><Text style={styles.proposalMetaInfo}>{moment.unix(proposal.start).format('MMM DD, YYYY, hh:mm')}</Text></View>
            <View style={styles.proposalMeta}><Text style={styles.proposalMetaTitle}>End:</Text><Text style={styles.proposalMetaInfo}>{moment.unix(proposal.end).format('MMM DD, YYYY, hh:mm')}</Text></View>
            <View style={styles.proposalMeta}><Text style={styles.proposalMetaTitle}>Author:</Text><Text style={styles.proposalMetaInfo}>{shortenAddress(proposal.author)}</Text></View>
            <View style={styles.proposalMeta}><Text style={styles.proposalMetaTitle}>Total voters:</Text><Text style={styles.proposalMetaInfo}>{proposal.votes}</Text></View>
          </View>
          <View style={styles.proposalVotingWrapper}>
                {proposal.scores.map((score, i) => (
                  <View key={i} style={styles.proposalVotingItemWrapper}>
                    <View style={styles.proposalVotingItemTextWrapper}>
                      <Text style={styles.proposalVotingItemText}>{score.title}</Text>
                      <Text style={styles.proposalVotingItemText}>{numeral(score.votingPower).format('0[.]0a')} {+(score.share * 100).toFixed()}%</Text>
                    </View>
                    <View style={styles.proposalVotingItemBackgroundLine}>
                      <View style={{...styles.proposalVotingItemInnerLine, backgroundColor: '#8463DF', width: `${score.share * 100}%`}} />
                    </View>
                  </View>
                ))}
              </View>
        </View>
      : <Text>No</Text>
    }
    </ScrollView>
  )
}


export default ProposalScreen