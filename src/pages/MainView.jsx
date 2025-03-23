import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import '../app.css'
import { useAppContext } from '../context/AppContext.jsx'
import MessagesView from './MessagesView.jsx'

const MainView = () => {

  //dont forget, import the current view from the context and use it as a param for the bottom nav

  const { currentTab } = useAppContext()
  
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className='main-view'>

      <MessagesView />
      

      <BottomNav activePage={currentTab} />

    </div>
  )
}

export default MainView