import React from 'react'
import {useMutation} from '@apollo/client'
import {TouchableOpacity} from 'react-native'
import * as Sentry from '@sentry/react-native'

import {
  FOLLOW_DAO,
  GET_DAO_DETAIL,
  GET_PROPOSALS,
  GET_USER_INFO,
  UNFOLLOW_DAO,
  handleHTTPError,
} from '../../services/api'
import Like from '../../assets/images/svg/Like.svg'

type FollowProps = {
  daoId: string
  userFollowed: boolean
  color?: string
}

const Follow = ({daoId, userFollowed, color}: FollowProps) => {
  const [followed, setFollowed] = React.useState<boolean>(userFollowed)

  // refetch querys that don't return the id of the dao that was changed
  const [followDao] = useMutation(FOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(true)
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {
        query: GET_PROPOSALS,
        variables: {first: 5, after: '', onlyFollowedDaos: true},
      },
      {
        query: GET_DAO_DETAIL,
        variables: {ids: [daoId], onlyMain: true},
      },
    ],
  })

  // refetch querys that don't return the id of the dao that was changed
  const [unfollowDao] = useMutation(UNFOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(false)
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {
        query: GET_PROPOSALS,
        variables: {first: 5, after: '', onlyFollowedDaos: true},
      },
      {
        query: GET_DAO_DETAIL,
        variables: {ids: [daoId], onlyMain: true},
      },
    ],
  })

  React.useEffect(() => {
    setFollowed(userFollowed)
  }, [userFollowed])

  const handleClick = async () => {
    if (followed) {
      setFollowed(false)
      await unfollowDao({
        variables: {
          unfollowDaoDaoId2: daoId,
        },
      })
    } else {
      setFollowed(true)
      await followDao({
        variables: {
          daoId: daoId,
        },
      })
    }
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Like fill={color ? color : followed ? '#8463DF' : 'none'} />
    </TouchableOpacity>
  )
}

export default Follow
