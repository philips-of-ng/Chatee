import React, { useState, useEffect } from 'react'
import assets from '../assets/assets'
import '../css/welcome-page.css'

import 'animate.css'

const WelcomePage = () => {

  //views - welcome, welcome-2, sign-in, sign-up
  const [currentView, setCurrentView] = useState('welcome')

  //animations
  const [loader, setLoader] = useState(0);
  const [slideOut, setSlideOut] = useState(null)
  const [fadeIn, setFadeIn] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader((prev) => {
        if (prev >= 100) {
          setSlideOut('animate__animated animate__fadeOutLeft')
          setTimeout(() => {
            setCurrentView('welcome-2')
            setFadeIn('animate__animated animate__fadeIn')
          }, 500);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);



  return (
    <div className='welcome-page-container'>
      {
        currentView == 'welcome' ? (
          <>
            <div className={`welcome-page ${slideOut}`}>
              <div className='wp-top'>
                <img src={assets.chatee_logo} alt="" />
              </div>

              <div className="wp-bottom">
                <div className='loader-div'>
                  <div style={{ width: `${loader}%` }} className='loader' >

                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentView == 'welcome-2' ? (
          <>
            <div className={`welcome-2 ${fadeIn}`}>
              <div className='welcome-2-top'>
                <img src={assets.intro_img} alt="" />

                <h1>Break the boundaries and connect with people all over the world</h1>
              </div>

              <div className='welcome-2-bottom'>
                <button className='main-btn'>Get Started</button>

                <button className='vice-btn'>Already have an account? <i className='bx bx-right-arrow-alt'></i></button>
              </div>
            </div>
          </>
        ) : (
          <>

          </>
        )
      }
    </div>
  )
}

export default WelcomePage