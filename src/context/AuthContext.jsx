import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  console.log('The auth context function is reached');
  

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser) && console.log('Current user', currentUser) : console.log('No user for now', currentUser);
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])


  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('Error logging out', error);
    }
  }


  return (
    <AuthContext.Provider value={{user, loading, logout}} >
      { loading ? 'Loading' : children }
    </AuthContext.Provider>
  )

}

// export const useAuth = () => {
//   return useContext(AuthContext)
// }
