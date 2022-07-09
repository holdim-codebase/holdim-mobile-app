import React from 'react'
import {Alert, Linking, Text} from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import Markdown from 'react-native-markdown-display'

import {markDownStyles} from './styles'

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
        hasBackButton: true,
      })
    } else {
      Linking.openURL(url)
    }
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

type MarkdownTextProps = {
  text: string
}

const MarkdownText = ({text}: MarkdownTextProps) => {
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

  return (
    <Markdown style={markDownStyles} rules={markdownRenderRules}>
      {text}
    </Markdown>
  )
}

export default MarkdownText
