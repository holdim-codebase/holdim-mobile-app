import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

export const markDownStyles = StyleSheet.create({
  body: {
    color: '#E2E2E2',
    fontSize: normalize(16),
    fontWeight: '400',
    lineHeight: normalize(22),
    fontFamily: 'System',
  },
  text: {
    fontSize: normalize(16),
  },
  heading1: {
    fontWeight: '700',
  },
  heading2: {
    fontWeight: '700',
  },
  heading3: {
    fontWeight: '700',
  },
  bullet_list: {paddingBottom: normalize(16)},
})
