import React, { useState } from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import './app.css'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className='whole-app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App