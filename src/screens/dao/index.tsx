import * as React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import {useLazyQuery, useQuery} from '@apollo/client'
import moment from 'moment'

import {TDAO, TProposal} from '../../types'
import {
  GET_DAO_DETAIL,
  GET_DAO_PROPOSALS,
  handleHTTPError,
} from '../../services/api'
import {convertURIForLogo} from '../feed'

//components
import MarkdownText from '../../components/MarkdownText'
import Follow from '../../components/Follow'

//styles
import styles from './styles'

const overviewTab = 'Overview'
const tokenTab = 'Token'
const proposalsTab = 'Proposals'

function DAOScreen({route, navigation}: any) {
  const [dao, setDao] = React.useState<TDAO>()
  const [proposals, setProposals] = React.useState<TProposal[]>([])
  const [activeTab, setActiveTab] = React.useState<string>(overviewTab)

  useQuery(GET_DAO_DETAIL, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ids: [route.params.daoId],
      onlyMain: true,
    },
    onCompleted: res => {
      setDao(res.daos[0])
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const [getDaoProposals] = useLazyQuery(GET_DAO_PROPOSALS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: res => {
      filterProposals(res.proposals)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
  })

  const filterProposals = (allProposals: TProposal[]) => {
    const active: TProposal[] = []
    const passed: TProposal[] = []

    allProposals.forEach(p =>
      new Date(p.endAt) < new Date() ? passed.push(p) : active.push(p),
    )
    setProposals(active.concat(passed))
  }

  const openProposal = (proposal: TProposal) => {
    navigation.navigate('Proposal', {proposal})
  }

  React.useEffect(() => {
    dao && getDaoProposals({variables: {daoIds: [dao.id]}})
  }, [dao])

  return dao ? (
    <View style={styles.daoWrapper}>
      <View style={styles.daoInfoWrapper}>
        <Image
          style={styles.daoImage}
          source={{uri: convertURIForLogo(dao.logo)}}
        />
        <View style={styles.daoInfoTextWrapper}>
          <Text style={styles.daoName}>{dao.name} </Text>
          <Text style={styles.daoUserDetail}>
            {
              +(
                (dao.tokens[0].personalizedData.quantity /
                  dao.tokens[0].totalSupply) *
                100
              ).toFixed(3)
            }
            % shares
          </Text>
          <Text style={styles.daoUserDetail}>
            In your wallet:
            <Text style={styles.daoUserAmount}>
              {' '}
              {Number(dao.tokens[0].personalizedData.quantity).toFixed(2)}{' '}
              {dao.tokens[0].symbol}
            </Text>
          </Text>
        </View>
        <View style={styles.daoFollowSvg}>
          <Follow daoId={dao.id} userFollowed={dao.personalizedData.followed} />
        </View>
      </View>
      <View style={styles.daoTabsWrapper}>
        <TouchableWithoutFeedback onPress={() => setActiveTab(overviewTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === overviewTab && styles.daoTabButtonActive,
            ]}>
            <Text style={styles.daoTabText}>Overview</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(tokenTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === tokenTab && styles.daoTabButtonActive,
            ]}>
            <Text style={styles.daoTabText}>Token</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(proposalsTab)}>
          <View
            style={[
              styles.daoTabButton,
              activeTab === proposalsTab && styles.daoTabButtonActive,
            ]}>
            <Text style={styles.daoTabText}>DAO Proposals</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        {activeTab === overviewTab ? (
          <View style={styles.daoOverviewWrapper}>
            <MarkdownText text={dao.overview} />
          </View>
        ) : null}
        {activeTab === tokenTab ? (
          <View style={styles.daoTokenWrapper}>
            <MarkdownText text={dao.tokenOverview} />
          </View>
        ) : null}
        {activeTab === proposalsTab ? (
          <View style={styles.daoProposalsWrapper}>
            {proposals.map((proposal, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => openProposal(proposal)}>
                  <View style={styles.daoProposal}>
                    <View style={styles.daoProposalTopPart}>
                      {new Date(proposal.endAt) < new Date() ? (
                        <Text
                          style={[
                            styles.daoProposalStatus,
                            styles.daoProposalStatusPassed,
                          ]}>
                          Passed
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.daoProposalStatus,
                            styles.daoProposalStatusActive,
                          ]}>
                          Active
                        </Text>
                      )}
                      {new Date(proposal.endAt) > new Date() ? (
                        <Text style={styles.daoProposalEndAt}>
                          <Text>till</Text>{' '}
                          {moment(new Date(proposal.endAt)).format(
                            'MMM DD, YYYY, HH:MM A',
                          )}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.daoProposalTitle}>
                      {proposal.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  ) : null
}

export default DAOScreen
