import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

const styles = StyleSheet.create({
  loadingWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(24),
    width: '100%',
  },
  profileInfoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: 80,
  },
  profileInfoTextWrapper: {
    flexDirection: 'column',
    marginLeft: normalize(24),
    width: normalize(210),
  },
  profileName: {
    fontSize: normalize(18),
    fontWeight: '700',
    fontFamily: 'System',
    color: 'white',
  },
  profilePortfolioAmount: {
    fontSize: normalize(16),
    lineHeight: normalize(26),
    fontWeight: '300',
    fontFamily: 'System',
    color: 'white',
  },
  portfolioWrapper: {
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    marginTop: normalize(29),
  },
  portfolioTitle: {
    fontSize: normalize(20),
    fontWeight: '700',
    lineHeight: normalize(23),
    color: 'white',
    marginBottom: normalize(10),
    fontFamily: 'System',
  },
  portfolioDaoListWrapper: {
    borderTopColor: 'rgba(193, 193, 193, 0.5)',
    borderTopWidth: 0.5,
  },
  portfolioDaoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5,
    paddingVertical: normalize(14),
  },
  assetLeft: {
    flexDirection: 'row',
  },
  assetImage: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(50),
  },
  assetTextWrapper: {
    height: '100%',
    flexDirection: 'column',
    paddingLeft: normalize(12),
  },
  assetTitle: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '700',
    fontFamily: 'System',
  },
  assetShareAmount: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '700',
    fontFamily: 'System',
  },
  assetShareText: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
  },
  assetRight: {
    flexDirection: 'column',
  },
  assetAmountNumber: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '700',
    fontFamily: 'System',
    textAlign: 'right',
  },
  assetAmountText: {
    color: 'white',
    fontSize: normalize(16),
    lineHeight: normalize(20),
    fontWeight: '300',
    fontFamily: 'System',
    textAlign: 'right',
  },
  assetDaoPrice: {
    color: 'white',
    fontSize: normalize(12),
    lineHeight: normalize(16),
    fontWeight: '300',
    fontFamily: 'System',
    textAlign: 'right',
  },
})

export default styles
