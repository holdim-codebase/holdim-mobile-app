import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  proposalWrapper: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 15
  },
  proposalTopSectionWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  proposalIcon: {
    width: 54,
    height: 54,
    borderRadius: 50
  },
  proposalDaoTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    marginLeft: 8,
    fontFamily: 'System',
  },
  proposalTitle: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    marginBottom: 32,
    fontFamily: 'System',
  },
  proposalDescr: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    marginBottom: 16,
    fontFamily: 'System',
  },
  proposalButton: {
    width: '100%',
    backgroundColor: '#8463DF',
    height: 34,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  proposalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'System',
  },
  proposalMetaWrapper: {
    flexDirection: 'column',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: 0.5,
    borderTopColor: '#2F2F2F',
    borderTopWidth: 0.5,
    paddingVertical: 15
  },
  proposalMeta: {
    flexDirection: 'row',
    marginVertical: 2
  },
  proposalMetaTitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#B4B4B4',
    fontFamily: 'System',
  },
  proposalMetaInfo: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: 'white',
    marginLeft: 4,
    fontFamily: 'System',
  },
  proposalVotingWrapper: {
    borderColor: '#7D7D7D',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 15
  },
  proposalVotingItemWrapper: {
    width: '100%',
    flexDirection: 'column',
  },
  proposalVotingItemTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  proposalVotingItemText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginBottom: 5,
    fontFamily: 'System',
  },
  proposalVotingItemBackgroundLine: {
    width: '100%',
    height: 7,
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    borderRadius: 13,
    marginBottom: 7,
    position: 'relative',
    zIndex: 1
  },
  proposalVotingItemInnerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 7,
    borderRadius: 13,
    marginBottom: 7,
    zIndex: 2,
    backgroundColor: 'red'
  },
})

export default styles