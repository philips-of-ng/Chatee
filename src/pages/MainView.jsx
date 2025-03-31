import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import '../app.css'
import { useAppContext } from '../context/AppContext.jsx'
import MessagesView from './MessagesView.jsx'
import CallsView from './CallsView.jsx'
import GroupsView from './GroupsView.jsx'
import SettingsView from './SettingsView.jsx'

const MainView = () => {

  console.log(SettingsView);
  

  //dont forget, import the current view from the context and use it as a param for the bottom nav

  //possible values - "messages", "calls", "groups", "settings"
  const { currentTab } = useAppContext()

  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className='main-view'>

      {
        currentTab == 'messages' && (
          <>
            <MessagesView />
          </>
        )
      }

      {
        currentTab == 'calls' && (
          <>
            <CallsView />
          </>
        )
      }

      {
        currentTab == 'groups' && (
          <>
            <GroupsView />
          </>
        )
      }

      {
        currentTab == 'settings' && (
          <>
            <SettingsView />
          </>
        )
      }

      
      <BottomNav activePage={currentTab} />

    </div>
  )
}

export default MainView