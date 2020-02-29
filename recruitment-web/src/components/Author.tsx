import React, { useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar';
import ldmAvatar from '@/assets/ldm-avatar.png'
import styled from 'styled-components';
import { IconButton, Button } from '@material-ui/core';
import SpaceBetween from './SpaceBetween';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AvatarWrapper = styled(Avatar)`
  display: inline-block;
  width: 28px !important;
  height: 28px !important;
`

interface IProps {

}

const Author: React.SFC<IProps> = () => {

  const openResume = useCallback(() => window.open('http://localhost:3800/public/陆冬敏个人简历.pdf'), [])

  return (
    <Button color="primary" onClick={openResume}>
      <AvatarWrapper alt="ludongmin" src={ldmAvatar} />
      <SpaceBetween width></SpaceBetween>
      作者简历
    </Button>
  )
}

export default React.memo(Author)
