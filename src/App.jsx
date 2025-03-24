import React, { useContext, useState } from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import './app.css'
import { useAuth, AuthProvider } from './context/AuthContext.jsx'
import { AppProvider, } from './context/AppContext.jsx'
import MainView from './pages/MainView'
import PersonalChat from './components/PersonalChat.jsx'

const App = () => {

  return (
    <AppProvider>
      <AuthProvider>
        <div className='whole-app-container'>
          <Router>
            <Routes>

              <Route path='/' element={<Main_or_Welcome />} />

              <Route path='/personal-chat' element={<PersonalChat />} />

            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </AppProvider>
  )
}


const Main_or_Welcome = () => {
  const { user } = useAuth()

  console.log('User in the App file', user);


  return user ? <MainView /> : <WelcomePage />
}

export default App
