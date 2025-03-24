import React from 'react'
import '../css/personal-chat.css'
import assets from '../assets/assets'

const PersonalChat = () => {

  return (
    <div className='personal-chat'>
      <div className='pc-top'>
        <div className='pc-top-left'>
          <button><i class='bx bx-arrow-back'></i></button>
          <img src={assets.userImage} alt="" />
          <p>Philips Edun</p>
        </div>

        <div className='pc-top-right'>
          <button><i class='bx bxs-phone' ></i></button>
          <button><i class='bx bx-dots-vertical-rounded' ></i></button>
        </div>
      </div>

      <div className='pc-main'>

      </div>

      <div className='pc-bottom'>
        <button><i class='bx bx-plus' ></i></button>

        <input type="text" />

        <button><i class='bx bxs-send' ></i></button>
      </div>
    </div>
  )

}

export default PersonalChat