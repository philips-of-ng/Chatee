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

  //Inner views: SignUp - su-email, su-password, su-username | SignIn - si-email, si-password
  const [currentInnerView, setCurrentInnerView] = useState("")


  // Actual states
  const [otp, setOtp] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmationResult, setConfirmationResult] = useState(null)

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
                      <h3>Enter your Email</h3>
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
                          if (!emailRegex.test(signUpCred.email)) {
                            return console.log('INVALID EMAIL');
                          }
                          triggerInnerTransition('su-password', 'animate__fadeOutLeft')
                        }}
                        className="next-btn">Next</button>
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


