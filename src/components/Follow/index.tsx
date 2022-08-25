import React from 'react'
import {useMutation} from '@apollo/client'
import {TouchableOpacity} from 'react-native'

import {
  FOLLOW_DAO,
  GET_DAO_DETAIL,
  GET_PROPOSALS,
  GET_USER_INFO,
  handleHTTPError,
  UNFOLLOW_DAO,
} from '../../services/api'
import Like from '../../assets/images/svg/Like.svg'

type FollowProps = {
  daoId: string
  userFollowed: boolean
}

const Follow = ({daoId, userFollowed}: FollowProps) => {
  const [followed, setFollowed] = React.useState<boolean>(userFollowed)
  const [color, setColor] = React.useState<string>(
    userFollowed ? '#8463DF' : 'none',
  )

  const [followDao] = useMutation(FOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(true)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {query: GET_PROPOSALS, variables: {onlyFollowedDaos: true}},
      {query: GET_DAO_DETAIL, variables: {ids: daoId, onlyMain: true}},
    ],
  })

  const [unfollowDao] = useMutation(UNFOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(false)
    },
    onError: error => {
      console.log(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {query: GET_PROPOSALS, variables: {onlyFollowedDaos: true}},
      {query: GET_DAO_DETAIL, variables: {ids: daoId, onlyMain: true}},
    ],
  })

  React.useEffect(() => {
    setColor(userFollowed ? '#8463DF' : 'none')
  }, [userFollowed])

  const followUnfollow = () => {
    if (daoId && followed) {
      unfollowDao({
        variables: {
          unfollowDaoDaoId2: daoId,
        },
      })
      setColor('none')
    } else {
      followDao({
        variables: {
          daoId: daoId,
        },
      })
      setColor('#8463DF')
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        followUnfollow()
      }}>
      <Like fill={color} />
    </TouchableOpacity>
  )
}

export default Follow
