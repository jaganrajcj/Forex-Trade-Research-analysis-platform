import React, { useState } from 'react'
import { styles } from '../styles'
import logoDark from '@/assets/LogoDark.png'
import logoLight from '@/assets/LogoLight.png'
import { Input } from "@material-tailwind/react";
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import { ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Logout, PersonAdd, Settings, SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux'
import { setMode } from "@/store/global";
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Navbar = ({ mode }) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={`sticky top-0 w-full backdrop-blur-xl h-16 ${mode === 'dark' ? 'bg-[#0f0e1a]' : 'bg-white'} ${mode === 'dark' ? 'text-white' : 'text-blue-gray-800'} px-14 flex flex-row justify-between items-center ${mode === 'dark' ? 'border-gray-800' : 'border-gray-300'} border-b-[1px]`}>
            {/* Left Side */}
            <div className="flex flex-row gap-3">
                <img src={mode === "dark" ? logoDark : logoLight} alt="" width="130px" height="35px" />
                <div className="w-70 h-5">
                    <Input label="Search..." />
                </div>
            </div>

            {/* Right side */}
            <FlexBetween gap="1.5rem">
                <IconButton sx={{ color: mode === 'dark' ? 'white' : theme.palette.secondary[200] }} onClick={() => dispatch(setMode())}>
                    {mode === "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                <IconButton sx={{ color: mode === 'dark' ? 'white' : theme.palette.secondary[200] }}>
                    <SettingsOutlined sx={{ fontSize: "25px" }} />
                </IconButton>

                <FlexBetween>
                    <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItem: "center",
                            textTransform: "none",
                            gap: "1rem",
                        }}
                    >
                        <Box
                            component="img"
                            alt="profile"
                            // src={profileImage}
                            src='https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[200] }}  >
                                {/* {user.name} */}userName
                            </Typography>
                            <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }} >
                                {/* {user.occupation} */}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        style={{ width: '350px' }}
                    >
                        <MenuItem sx={{ width: '250px', height: '50px' }} onClick={() => {
                            handleClose();
                            navigate('profile')
                        }}>

                            <Avatar />
                            Profile

                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={handleClose} sx={{ height: '50px' }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ height: '50px' }}>

                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>

        </div>
    )
}

export default Navbar