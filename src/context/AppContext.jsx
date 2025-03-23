import React from "react";
import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext()

 export const AppProvider = ({ children }) => {

  console.log('The App Context Function is Reached');

  const [currentTab, setCurrentTab] = useState(null)

  useEffect(() => {
    setCurrentTab('messages')
  }, [])

  useEffect(() => {
    console.log('The tab has been set to', currentTab);
  }, [currentTab])

  return (
    <AppContext.Provider value={{currentTab, setCurrentTab}}>
      { children }
    </AppContext.Provider>
  )
}


export const useAppContext = () => {
  return useContext(AppContext)
}


export default AppProvider
