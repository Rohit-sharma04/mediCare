import React from 'react'
import VideoCall from './VideoCall'
// import RoomChat from './RoomChat'
const Room = () => {
  return (
    <>
    <div className='flex flex-col sm:flex-row'>
    <div className='w-full '>
      <VideoCall/>
    </div>
    {/* <div className='bg-teal-300 sm:w-1/4 w-full'>
        <RoomChat/>
    </div> */}
    </div>
    </>
  )
}

export default Room
