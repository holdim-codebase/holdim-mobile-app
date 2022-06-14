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
    fontFamily: 'System',
    marginBottom: 32,
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
})

export default styles