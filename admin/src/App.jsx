import React, { Suspense, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import routes from './routes'
import './css/style.css';
import './charts/ChartjsConfig';
import axios from 'axios'
import UserContext from './context/userContext';

// Import pages
import Layout from './partials/Layout';
const DashboardPages = React.lazy(() => import('./pages'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Auth/Login'))
// import Login from './pages/Auth/Login';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [userData, setUserData] = useState({
    id: undefined,
    token: undefined,
    type: undefined,
    plan: undefined
  })

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    const token = localStorage.getItem('auth-token')

    if (!token) navigate('/login')
    else {
      axios.get(import.meta.env.VITE_API_URL + '/users',
        { headers: { "x-auth-token": token } }
      ).then((res) => {
        console.log(res)

        if (res.data.status) {

          setUserData({
            id: res.data.id,
            token: token,
            type: res.data.type,
            plan: res.data.plan
          })
          if (location.pathname.split('/').includes('login'))
            navigate('/dashboard')
        }
        else {
          navigate('/login')

        }

      }).catch((res) => {
        console.log(res.response)
        navigate('/login')
      })
    }

    setIsLoading(false)
  }, [])

  const fetchUser = async () => {
    try {

      const user = await axios.get(import.meta.env.VITE_API_URL + '/users',
        { headers: { "x-auth-token": userData.token } })

      // console.log(user.data)

      if (user.data.status) setUser(user.data)
    }
    catch (err) {
      console.log('Error Fetching user from database: ' + err.message)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [userData])


  return (
    !isLoading ?
      <>
        <UserContext.Provider value={{ userData, setUserData, user }}>
          <Suspense>
            <Routes>
              {/* <Route path={'/'} element={<Layout />} >
                {routes.map((route) => (
                  <Route key={route.path} path={route.path + '/*'} element={route.component} />
                ))}
              </Route> */}
              <Route path="/*" element={<DashboardPages />} />
              <Route path={'/login'} element={<Login />} />
            </Routes>

          </Suspense>
        </UserContext.Provider>
      </>
      : null
  );
}

export default App;
