import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  proposalWrapper: {
    flex: 1,
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(15),
  },
  proposalTopSectionWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  proposalIcon: {
    width: normalize(54),
    height: normalize(54),
    borderRadius: normalize(50),
  },
  proposalDaoTitle: {
    fontWeight: '700',
    fontSize: normalize(20),
    lineHeight: normalize(24),
    color: 'white',
    marginLeft: normalize(8),
    fontFamily: 'System',
  },
  proposalTitle: {
    fontWeight: '500',
    fontSize: normalize(16),
    lineHeight: normalize(19),
    color: 'white',
    marginBottom: normalize(18),
    fontFamily: 'System',
  },
  proposalDescription: {
    fontWeight: '400',
    fontSize: normalize(16),
    lineHeight: normalize(22),
    color: '#E2E2E2',
    marginBottom: normalize(16),
    fontFamily: 'System',
  },
  proposalButton: {
    width: '100%',
    backgroundColor: '#8463DF',
    height: normalize(34),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalLinksButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proposalLinkButton: {
    width: '48%',
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    flexDirection: 'row',
    height: normalize(34),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalLinkButtonAlone: {
    width: '100%',
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    flexDirection: 'row',
    height: normalize(34),
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  proposalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: normalize(12),
    lineHeight: normalize(14),
    fontFamily: 'System',
  },
  proposalLinkSvg: {
    paddingLeft: normalize(10),
  },
  proposalMetaWrapper: {
    flexDirection: 'column',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: 0.5,
    borderTopColor: '#2F2F2F',
    borderTopWidth: 0.5,
    paddingVertical: normalize(15),
  },
  proposalMeta: {
    flexDirection: 'row',
    marginVertical: normalize(5),
  },
  proposalMetaTitle: {
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(16),
    color: '#B4B4B4',
    fontFamily: 'System',
  },
  proposalMetaInfo: {
    fontWeight: '400',
    fontSize: normalize(14),
    lineHeight: normalize(16),
    color: 'white',
    marginLeft: normalize(4),
    fontFamily: 'System',
  },
  proposalVotingWrapper: {
    borderColor: '#7D7D7D',
    width: '100%',
    padding: normalize(15),
    borderRadius: normalize(12),
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: normalize(15),
  },
  proposalVotingItemWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  proposalVotingItemTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proposalVotingItemText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '400',
    lineHeight: normalize(14),
    marginBottom: normalize(5),
    fontFamily: 'System',
  },
  proposalVotingItemBackgroundLine: {
    width: '100%',
    height: normalize(7),
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    borderRadius: normalize(13),
    marginBottom: normalize(7),
    position: 'relative',
    zIndex: 1,
  },
  proposalVotingItemInnerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: normalize(7),
    borderRadius: normalize(13),
    marginBottom: normalize(7),
    zIndex: 2,
    backgroundColor: 'red',
  },
})

export default styles
