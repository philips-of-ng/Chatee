import React, { useContext, useState } from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import './app.css'
import { useAuth } from './context/AuthContext.jsx'
import MainView from './pages/MainView'

const App = () => {

  // const [loggedIn, setLoggedIn] = useState(false)


  return (
    <AuthProvider>
      <div className='whole-app-container'>
        <Router>
          <Routes>

            <Route path='/' element={ user ? <MainView /> : <WelcomePage /> } />
            
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App