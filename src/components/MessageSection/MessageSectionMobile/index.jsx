import React from 'react';
import { useDispatch } from 'react-redux';
import { setFriend } from '../../../pages/Messages/features/messagesSlice';
import MessageSection from '..';
import { Button } from '@mui/base';
import { ChevronLeft } from '@mui/icons-material';

const MessageSectionMobile = () => {
  const dispatch = useDispatch();

  const backToChats = () => {
    dispatch(setFriend(null))
  }

  return (
    <>
    <div className='mb-1 flex flex-grow text-left content-center'>
      <ChevronLeft/>
      <Button
        onClick={backToChats}
      >
        Back
      </Button>
      </div>
      <MessageSection />
    </>
  )
}

export default MessageSectionMobile
