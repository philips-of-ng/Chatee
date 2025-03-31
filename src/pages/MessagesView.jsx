import React from 'react'
import '../css/messages-view.css'

import assets from '../assets/assets.js'
import OneListedChat from '../components/OneListedChat.jsx'

const MessagesView = () => {
  return (
    <div className='messages-view'>
      
      <div className='add-user'>
        <div className='add-user-top'>
          <button><i class='bx bx-arrow-back'></i></button>
          <input type="text" placeholder='Search for a friend...' />
        </div>
      </div>


      <div className="mv-top">
        <img src={assets.chatee_logo} />

        <div>
          <button><i class='bx bxs-message-add'></i></button>
          <button><i class='bx bx-dots-vertical-rounded'></i></button>
        </div>
      </div>

      <div className='mv-search'>
        <input type="text" placeholder='Search for a chat...' />
      </div>

      <div className='chat-list'>
        <OneListedChat />
        <OneListedChat />
        <OneListedChat />
      </div>


    </div>
  )
}

export default MessagesView