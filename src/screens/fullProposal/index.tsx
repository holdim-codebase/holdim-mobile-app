import * as React from 'react'
import {Text, View, ScrollView, Image, Linking, Alert} from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import Markdown from 'react-native-markdown-display'

import {TProposal} from '../../types'
import {convertURIForLogo} from '../feed'
import styles, {markDownStyles} from './styles'

export const openLinkInAppBrowser = async (url: string) => {
  try {
    const isAvailable = await InAppBrowser.isAvailable()
    if (isAvailable) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'close',
        preferredBarTintColor: '#161616',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#161616',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        showInRecent: true,
        hasBackButton: true,
      })
    } else {
      Linking.openURL(url)
    }
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function FullProposalScreen({route}: any) {
  const [proposal, setProposal] = React.useState<TProposal>()

  const markdownRenderRules = {
    link: (node: any, children: any) => {
      return (
        <Text
          key={node.key}
          onPress={() => openLinkInAppBrowser(node.attributes.href)}>
          {children}
        </Text>
      )
    },
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
          <View style={styles.proposalTopSectionWrapper}>
            <Image
              style={styles.proposalIcon}
              source={{uri: convertURIForLogo(proposal.dao.logo)}}
            />
            <Text style={styles.proposalDaoTitle}>{proposal.dao.name}</Text>
          </View>
          <Text style={styles.proposalTitle}>{proposal.title}</Text>
          <Markdown style={markDownStyles} rules={markdownRenderRules}>
            {proposal.seniorDescription}
          </Markdown>
        </View>
      ) : (
        <Text>No</Text>
      )}
    </ScrollView>
  )
}

export default FullProposalScreen
