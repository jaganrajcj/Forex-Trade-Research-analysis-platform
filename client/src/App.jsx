import React, { useMemo, useEffect, useState, Suspense } from 'react'
// import DashboardRoutes from '@/routes/Dashboard.Routes'
// import HomeRoutes from '@/routes/Home.Routes'
// import AdminRoutes from 'bin/Admin.Routes'
import { CssBaseline, ThemeProvider, ScopedCssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
import axios from 'axios'
// import Router from '@/routes'
import routes from "@/routes"
import UserContext from '@/context/userContext'
import { Route, Routes } from 'react-router-dom'
import Loading from '@/components/Loading'


const App = () => {

  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    id: undefined,
    token: undefined,
    type: undefined,
    plan: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      else {
        setUserData({
          id: undefined,
          token: token,
          type: undefined,
        })

        let tokenResponse
        try {
          tokenResponse = await axios.get(import.meta.env.VITE_API_URL + '/users',
            { headers: { "x-auth-token": token } })
        }
        catch (err) {
          console.log(err.code, err.message)
        }

        // console.log("🚀 ~ file: App.jsx:35 ~ checkLoggedIn ~ tokenResponse", tokenResponse)
        if (tokenResponse) {
          // console.log(tokenResponse.data)
          setUserData({
            id: tokenResponse.data.id,
            token: token,
            type: tokenResponse.data.type,
            plan: tokenResponse.data.plan
          })
        }
      }
      setIsLoading(false)
      // console.count('Main useEffect calling')
      // console.log(userData)
    }
    checkLoggedIn()
  }, [])

  // console.log(theme)
  return (
    <>
      {!isLoading &&
        <div className="app">
          {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <UserContext.Provider value={{ userData, setUserData }}>
            <Suspense fallback={<></>}>
              <Routes>
                {
                  routes.map((route) => {
                    // console.log(route.path, route.component);
                    return <Route path={route.path + '/*'} element={route.component} key={route.path} />
                  })
                }
              </Routes>
            </Suspense>
          </UserContext.Provider>
          {/* </ThemeProvider> */}
        </div>
      }
    </>
  )
}

export default App
