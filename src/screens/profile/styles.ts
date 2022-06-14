import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  loadingWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileWrapper: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 24,
    width: '100%'
  },
  profileInfoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 80,
  },
  profileInfoTextWrapper: {
    flexDirection: 'column',
    marginLeft: 34
  },
  profileName: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
    fontFamily: 'System',
    color: 'white',
  },
  profilePortfolioAmount: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '300',
    fontFamily: 'System',
    color: 'white'
  },
  portfolioTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 23,
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
    fontFamily: 'System',
  },
  portfolioWrapper: {
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    borderTopColor: 'rgba(193, 193, 193, 0.5)',
    borderTopWidth: 0.5,
    paddingTop: 10
  },
  assetWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    marginVertical: 10,
  },
  assetLeft: {
    flexDirection: 'row'
  },
  assetImage: {
    width: 32,
    height: 32
  },
  assetTextWrapper: {
    height: '100%',
    flexDirection: 'column',
    marginLeft: 12,
  },
  assetTitle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    fontFamily: 'System',
  },
  assetShare: {
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '300',
    fontFamily: 'System'
  },
  assetRight: {
    flexDirection: 'row'
  },
  assetAmount: {
    color: 'white',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '300',
    fontFamily: 'System',
    textAlign: 'right'
  }
})

export default styles