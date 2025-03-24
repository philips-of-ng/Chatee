import React from 'react'
import assets from '../assets/assets'
import '../css/one-listed-chat.css'

import { useNavigate } from 'react-router-dom'

const OneListedChat = ({ chatDetails }) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('/personal-chat')} className='one-listed-chat'>
      <div className='olc-left'>
        <img src={assets.userImage} alt="" />

        <div>
          <p>Philips Edun</p>
          <span>Lets get the world! 🚀</span>
        </div>
      </div>

      <div className='olc-right'>
        <p>5 mins</p>
        <span>30</span>
      </div>
    </div>
  )
}

export default OneListedChat