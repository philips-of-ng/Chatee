import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import "../css/welcome-page.css";
import "animate.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebaseConfig";

const WelcomePage = () => {
  // Views: welcome → welcome-2 → sign-up
  const [currentView, setCurrentView] = useState("welcome");

  // Actual state
  const [otp, setOtp] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmationResult, setConfirmationResult] = useState(null)

  // Animation states
  const [animationClass, setAnimationClass] = useState("");

  // Loader progress (for welcome screen)
  const [loader, setLoader] = useState(0);

  //Sending the OTP and Verifying it

  const sendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }

      const appVerifier = window.recaptchaVerifier

      const formattedPhoneNum = "+" + phoneNumber
      const result = await signInWithPhoneNumber(auth, formattedPhoneNum, appVerifier)

      console.log('Result from trying to sign in', result);
      setConfirmationResult(result)
      console.log('OTP sent');
      
    } catch (error) {
      console.log('Erroe sending OTP', error);
    }
  }

  const verifyOtp = async () => {

  }
  
  useEffect(() => {
    // Loader animation for welcome screen
    const interval = setInterval(() => {
      setLoader((prev) => {
        if (prev >= 100) {
          triggerTransition("welcome-2", "animate__fadeOutLeft");
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval); // Cleanup interval
  }, []);


  const triggerTransition = (newView, exitAnimation) => {
    setAnimationClass(`animate__animated ${exitAnimation}`);
    setTimeout(() => {
      setCurrentView(newView);
      setAnimationClass("animate__animated animate__fadeIn");
    }, 500); // Ensure the delay matches animate.css duration
  };

  return (
    <div className="welcome-page-container">
      {currentView === "welcome" && (
        <div className={`welcome-page ${animationClass}`}>
          <div className="wp-top">
            <img src={assets.chatee_logo} alt="Logo" />
          </div>
          <div className="wp-bottom">
            <div className="loader-div">
              <div style={{ width: `${loader}%` }} className="loader"></div>
            </div>
          </div>
        </div>
      )}

      {currentView === "welcome-2" && (
        <div className={`welcome-2 ${animationClass}`}>
          <div className="welcome-2-top">
            <img src={assets.intro_img} alt="Intro" />
            <h1>Break the boundaries and connect with people all over the world</h1>
          </div>

          <div className="welcome-2-bottom">
            <button
              className="main-btn"
              onClick={() => triggerTransition("sign-up", "animate__slideOutLeft")}
            >
              Get Started
            </button>
            <button className="vice-btn">
              Already have an account? <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </div>
      )}

      {currentView === "sign-up" && (
        <div className={`sign-up ${animationClass}`}>
          <div className="sign-up-top">
            <button
              onClick={() => triggerTransition("welcome-2", "animate__slideOutRight")}
            >
              <i className="bx bx-left-arrow-alt"></i>
            </button>
          </div>

          <div className="sign-up-main">
            <div className="sum-inner">
              <h3>Enter your Phone number</h3>
              <PhoneInput value={phoneNumber}
               onChange={(phoneNumber) => {
                setPhoneNumber(phoneNumber)
                console.log(phoneNumber)
               }} 
               country={'ng'}
               countryCodeEditable={false} />
              <button onClick={() => sendOtp()} className="main-btn">Continue</button>
            </div>
          </div>

          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;


















































// import React, { useState, useEffect } from 'react'
// import assets from '../assets/assets'
// import '../css/welcome-page.css'

// import 'animate.css'

// import PhoneInput from 'react-phone-input-2'
// import "react-phone-input-2/lib/style.css";
// import "react-phone-input-2/lib/bootstrap.css";



// const WelcomePage = () => {

//   //views - welcome, welcome-2, sign-in, sign-up
//   const [currentView, setCurrentView] = useState('welcome')

//   //animations
//   const [loader, setLoader] = useState(0);
//   const [slideOut, setSlideOut] = useState(null)
//   const [slideOutRight, setSlideOutRight] = useState(null)
//   const [fadeIn, setFadeIn] = useState(null)
//   const [fadeOut, setFadeOut] = useState(null)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLoader((prev) => {
//         if (prev >= 100) {
//           setSlideOut('animate__animated animate__fadeOutLeft')
//           setTimeout(() => {
//             setSlideOut(null)
//             setCurrentView('welcome-2')
//             setFadeIn('animate__animated animate__fadeIn')
//           }, 500);
//           setFadeIn(null)
//           clearInterval(interval);
//           return prev;
//         }
//         return prev + 1;
//       });
//     }, 25);

//     return () => clearInterval(interval); // Cleanup to prevent memory leaks
//   }, []);



//   return (
//     <div className='welcome-page-container'>
//       {
//         currentView == 'welcome' ? (
//           <>
//             <div className={`welcome-page ${slideOut}`}>
//               <div className='wp-top'>
//                 <img src={assets.chatee_logo} alt="" />
//               </div>

//               <div className="wp-bottom">
//                 <div className='loader-div'>
//                   <div style={{ width: `${loader}%` }} className='loader' >

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : currentView == 'welcome-2' ? (
//           <>
//             <div className={`welcome-2 ${fadeIn} ${slideOut}`}>
//               <div className='welcome-2-top'>
//                 <img src={assets.intro_img} alt="" />

//                 <h1>Break the boundaries and connect with people all over the world</h1>
//               </div>

//               <div className='welcome-2-bottom'>
//                 <button  className='main-btn' onClick={() => {
//                   setSlideOut('animate__animated animate__slideOutLeft')
                  
//                   setCurrentView('sign-up')

//                   setFadeIn(null)
//                 }}>Get Started</button>

//                 <button className='vice-btn'>Already have an account? <i className='bx bx-right-arrow-alt'></i></button>
//               </div>
//             </div>
//           </>
//         ) : currentView == 'sign-up' ? (
//           <>
//             <div className={`sign-up ${slideOutRight} ${fadeIn}`}>
//               <div className='sign-up-top'>
//                 <button onClick={() => {
//                   setSlideOutRight('animate__animated animate__slideOutRight')
//                   setTimeout(() => {
//                     setCurrentView('welcome-2')
//                     setSlideOutRight(null)
//                   }, 500);
//                 }}><i class='bx bx-left-arrow-alt'></i></button>
//               </div>

//               <div className='sign-up-main'>
//                 <div className='sum-inner'>
//                   <h3>Enter your Phone number</h3>

//                   <PhoneInput  countryCodeEditable={false} />

//                   <button className='main-btn'>Continue</button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
          
//           </>
//         )
//       }
//     </div>
//   )
// }

// export default WelcomePage