import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  loadingWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  feedWrapper: {
    flex: 1, 
    width: '100%',
    height: '100%'
  },
  proposalWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'rgba(193, 193, 193, 0.5)',
    borderBottomWidth: 0.5
  },
  proposalImageWrapper: {
    marginRight: 8,
    width: '15%'
  },
  proposalImage: {
    width: 52,
    height: 52,
    borderRadius: 50
  },
  proposalContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '85%'
  },
  proposalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: 'System',
  },
  proposalDescription: {
    color: '#E2DFDF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 12,
    fontFamily: 'System'
  },
  proposalEndtime: {
    color: '#E2DFDF',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    fontStyle: 'italic',
    marginBottom: 12,
    fontFamily: 'System',
  },
  proposalVotingWrapper: {
    borderColor: '#7D7D7D',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between'
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