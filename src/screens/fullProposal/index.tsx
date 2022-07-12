import * as React from 'react'
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native'

import MarkdownText from '../../components/MarkdownText'
import {TProposal} from '../../types'
import {convertURIForLogo} from '../feed'
import styles from './styles'

function FullProposalScreen({route, navigation}: any) {
  const [proposal, setProposal] = React.useState<TProposal>()

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  React.useEffect(() => {
    if (route.params?.proposal) {
      setProposal(route.params.proposal)
    }
  }, [])

  if (!proposal) return <View />

  return (
    <ScrollView style={styles.proposalWrapper}>
      {proposal ? (
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
          <MarkdownText text={proposal.seniorDescription} />
        </View>
      ) : (
        <Text>No</Text>
      )}
    </ScrollView>
  )
}

export default FullProposalScreen
