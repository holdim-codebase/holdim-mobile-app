import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  loadingWrapperFullScreen: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
    backgroundColor: 'black',
  },
  daoWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(24),
    width: '100%',
    height: '100%',
  },
  daoInfoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(32),
  },
  daoImage: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(50),
  },
  daoInfoTextWrapper: {
    flexDirection: 'column',
    marginLeft: normalize(12),
    width: normalize(236),
  },
  daoName: {
    fontSize: normalize(24),
    lineHeight: normalize(29),
    paddingBottom: normalize(4),
    fontWeight: '700',
    fontFamily: 'System',
    color: '#FFFFFF',
  },
  daoUserDetail: {
    fontSize: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
    color: '#FFFFFF',
  },
  daoUserAmount: {
    fontWeight: '700',
  },
  daoFollowSvg: {
    paddingBottom: normalize(40),
  },
  daoTabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: normalize(20),
  },
  daoTabButton: {
    borderRadius: normalize(7),
    backgroundColor: '#161616',
    width: '32%',
    flexDirection: 'row',
    height: normalize(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  daoTabButtonActive: {
    backgroundColor: '#8463DF',
  },
  daoTabText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '700',
  },
  daoTitleDescription: {
    height: normalize(24),
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontWeight: '700',
  },
  daoTextDescription: {
    color: '#FFFFFF',
    fontSize: normalize(14),
    fontWeight: '300',
  },
  daoOverviewWrapper: {
    marginBottom: normalize(22),
  },
  daoTokenWrapper: {
    marginBottom: normalize(22),
  },
  daoProposalsWrapper: {
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5,
    marginBottom: normalize(20),
  },
  daoProposal: {
    borderTopColor: 'rgba(193, 193, 193, 0.5)',
    borderTopWidth: 0.5,
    paddingVertical: normalize(9),
  },
  daoProposalTopPart: {
    flexDirection: 'row',
    paddingBottom: normalize(4),
  },
  daoProposalStatus: {
    color: '#8463DF',
    fontSize: normalize(13),
    fontWeight: '500',
    paddingRight: normalize(22),
  },
  daoProposalStatusActive: {
    color: '#8463DF',
  },
  daoProposalStatusPassed: {
    color: 'rgba(128, 128, 128, 1)',
  },
  daoProposalEndAt: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: normalize(13),
    fontWeight: '400',
  },
  daoProposalTitle: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '400',
  },
})

export default styles
