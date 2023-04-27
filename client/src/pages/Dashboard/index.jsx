import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Navbar'
import Main from './Main'
import Navigation from './components/Navigation'
import { styles } from './styles'
import { Route, Routes } from 'react-router-dom'

// const Dashboard = React.lazy(() => import("./Dash"))
const Journal = React.lazy(() => import("./Journal"))
const Profile = React.lazy(() => import("./Profile"))
const Summary = React.lazy(() => import("./Summary"))

const routes = [
    // {
    //     path: "/",
    //     component: <Dashboard />,
    // },
    {
        path: "journal",
        component: <Journal />,
    },
    {
        path: "profile",
        component: <Profile />,
    },
    {
        path: "summary",
        component: <Summary />,
    },
    {
        path: "*",
        component: <h2>Route cannot be resolved...</h2>
    }
]

const Dashboard = () => {

    const mode = useSelector((state) => state.global.mode)

    return (
        <div className={`${mode === "dark" ? 'bg-[#11101d]' : 'bg-[#f3f6fd]'} ${mode === "dark" ? 'text-white' : 'text-[#333]'} h-full overflow-scroll max-w-[2000px]`}>
            <Header mode={mode} />
            <div className="px-14 py-3">
                <Navigation mode={mode} />
                <Suspense fallback={<h2>Loading..</h2>}>
                    <Routes>
                        {
                            routes.map(({ path, component }) => {
                                return <Route path={path} element={component} key={path} />
                            })
                        }
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default Dashboard
