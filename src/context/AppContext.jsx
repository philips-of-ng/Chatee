import React from "react";
import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext()

 export const AppProvider = ({ children }) => {

  console.log('The App Context Function is Reached');


  //CODE FOR SETTING THE CURRENT TAB
  //possible values - "messages", "calls", "groups", "settings"

  const [currentTab, setCurrentTab] = useState('messages')
  useEffect(() => {
    console.log('The tab has been set to', currentTab);
  }, [currentTab])

  //CODE FOR CONTROLLING THE SEARCH SYSTEM
  const [searchActive, setSearchActive] = useState(false)



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
