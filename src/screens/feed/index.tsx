import * as React from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import {TFeedResponse} from '../../types'

import styles from './styles'

function FeedScreen({navigation}: any) {
  const [feed, setFeed] = React.useState<TFeedResponse>([])

  React.useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    // try {
    //   await getFeed().then(res => {
    //     setFeed(res)
    //   })
    // } catch (e: any) {
    //   Alert.alert(
    //     'Something went wrong',
    //     'Please try again',
    //     [
    //       {
    //         text: 'Reload',
    //         onPress: fetchFeed
    //       },
    //       {
    //         text: 'Cancel',
    //         onPress: () => { }
    //       },
    //     ]
    //   );
    // }
  }

  const openProposal = (proposal: TFeedResponse[0]) => {
    navigation.navigate('Proposal', {proposal})
  }

  const dateNow = Math.floor(Date.now() / 1000)

  return (
    <ScrollView style={styles.feedWrapper}>
      {feed.map((item, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => openProposal(item)}>
          <View style={styles.proposalWrapper}>
            <View style={styles.proposalImageWrapper}>
              <Image source={{uri: item.icon}} style={styles.proposalImage} />
            </View>
            <View style={styles.proposalContentWrapper}>
              <Text style={styles.proposalTitle}>{item.daoTitle}</Text>
              <Text style={styles.proposalDescription}>
                {item.description.short}
              </Text>
              <Text style={styles.proposalEndtime}>
                {dateNow < item.end ? 'Ends:' : 'Voting ended on'}{' '}
                {moment.unix(item.end).format('MMM DD, YYYY, hh:mm')}
              </Text>
              <View style={styles.proposalVotingWrapper}>
                {item.scores.map((score, i) => (
                  <View key={i} style={styles.proposalVotingItemWrapper}>
                    <View style={styles.proposalVotingItemTextWrapper}>
                      <Text style={styles.proposalVotingItemText}>
                        {score.title}
                      </Text>
                      <Text style={styles.proposalVotingItemText}>
                        {numeral(score.votingPower).format('0[.]0a')}{' '}
                        {+(score.share * 100).toFixed()}%
                      </Text>
                    </View>
                    <View style={styles.proposalVotingItemBackgroundLine}>
                      <View
                        style={{
                          ...styles.proposalVotingItemInnerLine,
                          backgroundColor: '#8463DF',
                          width: `${score.share * 100}%`,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}

export default FeedScreen
