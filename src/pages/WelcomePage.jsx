import React, { useState, useEffect, useRef } from "react";
import assets from "../assets/assets";
import "../css/welcome-page.css";
import "animate.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const WelcomePage = () => {
  // Views: welcome → welcome-2 → sign-up
  const [currentView, setCurrentView] = useState("welcome");

  //Inner views: SignUp - su-email, su-otp, su-password, su-username | SignIn - si-email, si-password
  const [currentInnerView, setCurrentInnerView] = useState("su-otp")


  // Actual states
  const [otp, setOtp] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [overlayLoader, setOverlayLoader] = useState(false)

  const [loadingState, setLoadingState] = useState(false)
  const [errorState, setErrorState] = useState(null)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // Animation states
  const [animationClass, setAnimationClass] = useState("");
  const [innerAnimationClass, setInnerAnimationClass] = useState("")

  // Loader progress (for welcome screen)
  const [loader, setLoader] = useState(0);

  //logging in

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })


  //SIGNING UP

  const [signUpCred, setSignUpCred] = useState({ email: '', password: '', confirmPassword: '', displayPicture: null })
  const [displayPicture, setDisplayPicture] = useState(null)
  const [loadingSignUp, setLoadingSignUp] = useState(false)

  const sendCRU_Otp = async (email) => {

    const endPoint = `http://localhost:5000/api/users/cru-otp?email=${encodeURIComponent(email)}`

    try {
      setLoadingState(true)
      const validEmail = emailRegex.test(email)

      if (!validEmail) {
        throw new Error('invalid email')
      }

      const response = await axios.post(endPoint)

      console.log('Response from sneding otp', response);


      triggerInnerTransition('su-otp', 'animate__fadeOutLeft')


    } catch (error) {
      if (error) {
        setErrorState(error.message)
        setTimeout(() => {
          setErrorState(null)
        }, 5000);
      }
    } finally {
      setLoadingState(false)
    }
  }

  const verifyCRU_Otp = async () => {
    setOverlayLoader(true)
    const endPoint = 'http:///localhost:5000/api/users/vcru-otp'
    try {
      const response = await axios.post(endPoint, {
        email: signUpCred.email,
        otpInput: otp
      })

      console.log(response);
      

    } catch (error) {
      console.log('Error verifying otp', error);
    } finally {
      setOverlayLoader(false)
    }

  }


  const otpRef = useRef()
  const focusOtpInput = () => {
    if (otpRef.current) {
      otpRef.current.focus()
    }
  }


  useEffect(() => {
    focusOtpInput()
  }, [])

  useEffect(() => {
    if (otp.length >= 4) {
      verifyCRU_Otp()
    }

  }, [otp])


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

  const triggerInnerTransition = (newInnerView, exitAnimation) => {
    setInnerAnimationClass(`animate__animated ${exitAnimation}`)
    setTimeout(() => {
      setCurrentInnerView(newInnerView)
      setInnerAnimationClass('animate__animated animate__fadeIn')
    }, 500);
  }



  return (
    <div className="welcome-page-container">

      {
        overlayLoader && (
          <>
            <div className="overlay-loader">
              <div>
                <Spinner color={'#78e1b7'} size={40} speed={0.6}  />

                <p>Please wait...</p>
              </div>
              
            </div>
          </>
        )
      }

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
              onClick={() => {
                triggerTransition("sign-up", "animate__slideOutLeft")
                setCurrentInnerView('su-email')
              }}
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

            <h4>Create Account</h4>

            <button><i class='bx bx-question-mark'></i></button>
          </div>

          <div className="sign-up-main">
            <div className="sum-inner">

              {
                currentInnerView == 'su-email' && (
                  <>
                    <div className={`one-input-module ${innerAnimationClass}`}>

                      <h3 style={{ color: errorState ? 'red' : 'white' }}>
                        {errorState || 'Enter your email'}
                      </h3>


                      <input
                        onChange={(e) => {

                          setSignUpCred((prev) => {
                            const updatedCreds = { ...prev, email: e.target.value }
                            console.log('Latest signup credentials', updatedCreds);
                            return updatedCreds
                          })
                        }}
                        type="email" placeholder="e.g johndoe@gmail.com" />
                      <button
                        onClick={() => {
                          sendCRU_Otp(signUpCred.email.trim())
                        }}
                        className="next-btn">{loadingState ? 'Loading...' : 'Next'}</button>
                    </div>
                  </>
                )
              }

              {
                currentInnerView == 'su-otp' && (
                  <>
                    <div className={`one-input-module ${innerAnimationClass}`}>
                      <h3>Confirm Email</h3>
                      <p>{`Enter the OTP sent to ${signUpCred.email}`}</p>

                      <input className="otp-input" ref={otpRef} maxLength={4} autoFocus onChange={(e) => {
                        setOtp((prev) => {
                          const updatedOtp = e.target.value
                          return updatedOtp
                        })
                      }} type="tel" name="" id="" />

                      <div className="otp-bx-container">
                        <div onClick={() => focusOtpInput()} className="one-dg">{otp[0] ? otp[0] : ''}</div>
                        <div onClick={() => focusOtpInput()} className="one-dg">{otp[1] ? otp[1] : ''}</div>
                        <div onClick={() => focusOtpInput()} className="one-dg">{otp[2] ? otp[2] : ''}</div>
                        <div onClick={() => focusOtpInput()} className="one-dg">{otp[3] ? otp[3] : ''}</div>
                      </div>

                      <p className="resend-otp">Didn't receive code?  <button>Resend</button></p>
                    </div>
                  </>
                )
              }

              {
                currentInnerView == 'su-password' && (
                  <>
                    <div className={`one-input-module ${innerAnimationClass}`}>
                      <h3>Create New Password</h3>

                      <input
                        onChange={(e) => {
                          setSignUpCred((prev) => {
                            const updatedCreds = { ...prev, password: e.target.value }
                            console.log('Latest signuo credentials', updatedCreds);
                            return updatedCreds
                          })
                        }}
                        type="password" placeholder="Input Password" />

                      <input
                        onChange={(e) => {
                          setSignUpCred((prev) => {
                            const updatedCreds = { ...prev, confirmPassword: e.target.value }
                            console.log('Latest signuo credentials', updatedCreds);
                            return updatedCreds
                          })
                        }}
                        type="password" placeholder="Confirm Password" />

                      <button
                        onClick={() => {
                          if (!emailRegex.test(signUpCred.email)) {
                            return console.log('INVALID EMAIL');
                          }
                          triggerInnerTransition('su-dp-username', 'animate__fadeOutLeft')
                        }}
                        className="next-btn">Next</button>
                    </div>
                  </>
                )
              }

              {
                currentInnerView == 'su-dp-username' && (
                  <>
                    <div className={`one-input-module ${innerAnimationClass}`}>

                      <div className="input-image-div">

                        <label htmlFor="image">
                          <img
                            className="input-picture"
                            src={displayPicture == null ? assets.upload_image : displayPicture}
                            alt="Upload"
                          />
                        </label>


                        <input
                          accept=".jpg, .png, .svg"
                          style={{ display: 'none' }}
                          type="file"
                          id="image"
                          hidden
                          onChange={(e) => {
                            e.preventDefault();
                            const file = e.target.files[0];
                            if (!file) return;

                            // Validate file type and size
                            if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
                              // toast.error('Invalid file type. Only JPG, PNG, and SVG are allowed.');
                              return;
                            }

                            setSignUpCred((prev) => ({
                              ...prev,
                              displayPicture: file
                            }));
                            setDisplayPicture(URL.createObjectURL(file));
                          }}
                        />

                        {/* Remove Image Button */}
                        {displayPicture != null && (

                          <>
                            {/* <img
                              title="Remove Image"
                              className="input-picture-close"
                              src={assets.close_icon}
                              alt="Remove"
                              onClick={() => {
                                setInputPicture(null);
                                setFormData((prev) => ({ ...prev, display_picture: null }));
                              }}
                            /> */}

                            <button onClick={() => {
                              setDisplayPicture(null)
                              setSignUpCred((prev) => ({ ...prev, displayPicture: null }))
                            }}>X</button>
                          </>



                        )}

                      </div>

                      <h3>What should people call you?</h3>

                      <input type="text" placeholder="Username" />

                      <button className="main-btn">Create Account</button>

                    </div>
                  </>
                )
              }


            </div>
          </div>

          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;


