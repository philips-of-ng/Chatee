import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const MainView = () => {

  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div>

      <div>
        
      </div>
      
      <h1>You are logged in and you are currently in the app</h1>

      <button onClick={() => {
        logout()
        navigate('/')
      }} >logout</button>

    </div>
  )
}

export default MainView