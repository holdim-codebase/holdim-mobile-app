import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

export const markDownStyles = StyleSheet.create({
  body: {
    color: '#D7D7D7',
    fontSize: normalize(16),
    fontWeight: '400',
    lineHeight: normalize(22),
    fontFamily: 'System',
  },
  text: {
    fontSize: normalize(16),
  },
  heading1: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heading2: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heading3: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bullet_list: {paddingBottom: normalize(16)},
})
