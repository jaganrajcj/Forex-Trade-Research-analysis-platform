import theme from '@material-tailwind/react/theme'
import { useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './styles.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Breadcrumbs } from "@material-tailwind/react";
import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,
} from "@heroicons/react/24/solid";
import LogoutIcon from '@mui/icons-material/Logout';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import BiotechIcon from '@mui/icons-material/Biotech';
import PersonIcon from '@mui/icons-material/Person';


const icon = {
    className: "w-5 h-5 text-inherit",
};
const navs = [
    {
        title: 'Dashboard',
        path: '/testDashboard',

    },
    {
        title: 'Journal',
        path: '/testDashboard/journal',
        paths: [
            {
                path: 'journal',
                name: 'Journal',
                icon: <TableCellsIcon {...icon} />
            },
            {
                path: 'summary',
                name: 'Summary',
                icon: <SummarizeIcon {...icon} />
            },
            {
                path: 'equity',
                name: 'Equity Curve',
                icon: <ShowChartIcon {...icon} />
            },
        ]
    },
    {
        title: 'Analysis',
        path: '/testDashboard/analysis',
        paths: [
            {
                path: 'Technical',
                name: 'Technical',
                icon: <BiotechIcon {...icon} />
            },
            {
                path: 'Fundamental',
                name: 'Fundamental',
                icon: <BiotechIcon {...icon} />
            }
        ]
    },
    {
        title: 'Posts',
        path: '/testDashboard/posts',

    },

]

const Navigation = ({ mode }) => {

    const theme = useTheme();
    const { pathname } = useLocation();

    // useEffect(() => {
    //     console.log(pathname.slice(pathname.indexOf('/', 1) + 1, pathname.indexOf('/', 1)))
    //     console.log(pathname.split('/')[1])

    // }, [pathname])




    return (
        <div className={`flex flex-col gap-1`}>

            <div className="flex flex-row gap-3 my-4">
                {
                    navs.map((nav) => {
                        return (
                            <div className="dropdown relative inline-block mr-10" key={nav.title}>
                                <button className={`b-0 opacity-80 mb-5`}>
                                    <Link to={nav.path} sx={{}}
                                        style={{ fontWeight: nav.title.toLowerCase() === pathname.split('/')[2] ? 'bold' : '' }}
                                    >{nav.title}
                                    </Link>
                                </button>
                                {
                                    nav.paths &&
                                    <div className={`dropdown-content hidden absolute shadow-xl z-10 bg-white text-gray-800 rounded-md mr-10`}>
                                        {nav.paths.map((path) => (
                                            <Link key={path.name} to={'/' + pathname.split('/')[1] + '/' + path.path} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }} className="hover:bg-blue-gray-50 w-full px-7 py-4 rounded-md mr-10 ">
                                                {path.icon}
                                                <span>{path.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                }
                                {nav.paths && <ArrowDropDownIcon />}

                            </div>
                        )
                    })
                }
            </div >


        </div>

    )
}

export default Navigation