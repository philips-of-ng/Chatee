import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  console.log('The auth context function is reached');
  

  const [user, setUser] = useState('user naani')
  const [loading, setLoading] = useState(true)


  // get the user from the local storage if there is one
  useEffect(() => {
    const storedUser = localStorage.getItem('chateeUser')
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    console.log('user from authcontext', user);
  }, [user])


  const login = (userObject) => {
    try {
      setUser(userObject)
      localStorage.setItem('chateeUser', userObject)
      console.log('User Logged In and Saved', JSON.parse(localStorage.getItem('chateeUser')));
    } catch (error) {
      console.log('auth error logging in', error);
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem('chateeUser')
    } catch (error) {
      console.log('Error logging out', error);
    }
  }


  return (
    <AuthContext.Provider value={{user, loading, login, logout}} >
      { children }
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  return useContext(AuthContext)
}
