import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material"
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined, CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material"
import LogoDark from '@/assets/logoDark.png'
import LogoLight from "@/assets/logoLight.png"

// import { FaBeer } from 'react-icons/fa';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import BiotechIcon from '@mui/icons-material/Biotech';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '@/components/FlexBetween'
import { useSelector } from 'react-redux'
import useAuth from '@/hooks/useAuth'
import { authService } from '@/services/authService'
// import profileImage from 'assets/profile.jpeg';

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Users",
        icon: <PeopleAltIcon />
    },
    // {
    //     text: "Journal",
    //     icon: <AnalyticsOutlinedIcon />
    // },
    // {
    //     text: "Summary",
    //     icon: <SummarizeIcon />
    // },
    // {
    //     text: "Equity Curve",
    //     icon: <ShowChartIcon />
    // },
    {
        text: "Analysis",
        icon: null
    },
    {
        text: "Fundamentals",
        icon: <PointOfSaleOutlined />
    },
    // {
    //     text: "Technical",
    //     icon: <BiotechIcon />
    // },
    // {
    //     text: "Ideas",
    //     icon: null
    // },
    // {
    //     text: "Posts",
    //     icon: <PointOfSaleOutlined />
    // },
    // {
    //     text: "User",
    //     icon: null
    // },
    // {
    //     text: "Profile",
    //     icon: <PersonIcon />
    // },
    {
        text: "Logout",
        icon: <LogoutIcon />
    },

]

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    user
}) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("dashboard");
    const navigate = useNavigate();
    const theme = useTheme();
    const mode = useSelector((state) => state.global.mode)
    const { setUserData } = useAuth()

    // console.log("🚀 ~ file: Sidebar.jsx:149 ~ mode", mode)    

    useEffect(() => {
        console.log(pathname)
        setActive(pathname.slice(pathname.indexOf('/', 1) + 1) || 'dashboard')

        // if (active == '') setActive('dashboard')
        // setActive(pathname.substring(1));
        // console.log(pathname.substring(1))
    }, [pathname])

    const handleLogout = (navigate, setUserData) => {
        console.log('Logging out...')
        setUserData({
            id: undefined,
            token: undefined,
            type: undefined,
        })
        localStorage.setItem("auth-token", "");
        navigate("/")
    }

    return (
        <Box component="nav">
            {isSidebarOpen &&
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m=".6rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">

                                    <h2 className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} font-semibold text-4xl mt-4`}><strong className="text-[#379CF0]">Fx </strong>Edge <div className="w-[15px] h-[15px] bg-[#379CF0] inline-block rounded-full"></div></h2>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {
                                navItems.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                                {text}
                                            </Typography>
                                        )
                                    }
                                    const lcText = text.toLowerCase();
                                    return (
                                        <ListItem key={text} disablePadding sx={{ mt: text === 'Logout' ? '3rem' : null }}>
                                            <ListItemButton
                                                onClick={() => {
                                                    if (text === 'Logout') {
                                                        authService.Logout(navigate, setUserData);
                                                    }
                                                    else {
                                                        navigate(`${lcText}`);
                                                        setActive(lcText);
                                                    }
                                                }}

                                                sx={{
                                                    backgroundColor: active === lcText ? '#3b82f6' : "transparent",
                                                    color: active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "2rem",
                                                        color: active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {
                                                    active === lcText && (
                                                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                    )
                                                }
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <Box
                                component="img"
                                alt="profile"
                                src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }} >
                                    {user.name || ' '}

                                </Typography>
                                <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }} >
                                    {/* {user.occupation} */}
                                    {/* user occupation */}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer >
            }
        </Box >
    )
}

export default Sidebar