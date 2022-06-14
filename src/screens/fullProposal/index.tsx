import * as React from 'react'
import { Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import { TFeedResponse } from '../../types'

import styles from './styles'

function FullProposalScreen({ route }: any) {

  const [proposal, setProposal] = React.useState<TFeedResponse[0]>()


  React.useEffect(() => {
    if (route.params?.proposal) {
      setProposal(route.params.proposal)
    }
  }, [])

  if (!proposal) return <View />
  

  return (
    <ScrollView style={styles.proposalWrapper}>
      {proposal ? 
        <View style={styles.proposalWrapper}>
          <View  style={styles.proposalTopSectionWrapper}>
            <Image style={styles.proposalIcon} source={{ uri: proposal.icon}}/>
            <Text style={styles.proposalDaoTitle}>{proposal.daoTitle}</Text>
          </View>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Text style={styles.proposalDescr}>{proposal.description.long}</Text>
        </View>
      : <Text>No</Text>
    }
    </ScrollView>
  )
}


export default FullProposalScreen