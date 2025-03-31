import React from 'react'
import '../css/bottom-nav.css'
import { useAppContext } from '../context/AppContext'

const BottomNav = ({ activePage }) => {

  const { setCurrentTab } = useAppContext()

  const tabSetter = (newTab) => {
    setCurrentTab(newTab)
  }

  return (

    <div className='bottom-nav'>

      <button
        onClick={() => tabSetter('messages')}
        className={`${activePage == 'messages' ? 'active' : ''}`}>
        <i class={`bx bxs-message-square-dots ${activePage == 'messages' ? 'active' : ''}`}></i>
      </button>


      <button
        onClick={() => tabSetter('calls')}
        className={`${activePage == 'calls' ? 'active' : ''}`}>
        <i class={`bx bxs-phone ${activePage == 'calls' ? 'active' : ''}`} ></i>
      </button>


      <button
        onClick={() => tabSetter('groups')}
        className={`${activePage == 'groups' ? 'active' : ''}`}>
        <i class={`bx bxs-group ${activePage == 'groups' ? 'active' : ''}`} ></i>
      </button>


      <button
        onClick={() => tabSetter('settings')}

        className={`${activePage == 'settings' ? 'active' : ''}`}>
        <i class={`bx bxs-cog ${activePage == 'settings' ? 'active' : ''}`} ></i>
      </button>

    </div>
  )
}

export default BottomNav