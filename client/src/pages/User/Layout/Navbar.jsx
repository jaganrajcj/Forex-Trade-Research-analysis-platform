import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import { setMode } from "@/store/global"
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Logout, Settings } from "@mui/icons-material";
import { Box, Divider, ListItemIcon, useTheme } from "@mui/material";
import { useState } from "react";
import FlexBetween from "@/components/FlexBetween";
import { authService } from "@/services/authService";
import useAuth from "@/hooks/useAuth";

const DashboardNavbar = ({ isNonMobile, mode, user, isSidebarOpen, setIsSideBarOpen }) => {

    const fixedNavbar = true
    const { pathname } = useLocation();
    const [layout, page] = pathname.split("/").filter((el) => el !== "");
    const theme = useTheme()
    const dispatch = useDispatch();
    const { setUserData } = useAuth()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const fontColor = mode === "dark" ? "text-white" : "text-black"

    return (
        <Navbar
            sx={{ border: 0 }}
            // color={fixedNavbar ? "gray" : "transparent"}
            className={`${mode === "dark" ? "bg-[#282733]" : "bg-[white]"} backdrop-blur-sm border-0 shadow-md rounded-xl w-["96%"] transition-all m-4 mr-5 ${fixedNavbar
                ? "sticky top-4 z-40 py-3"
                : "px-0 py-1"
                }
                ${isSidebarOpen ? "ml-[20rem]" : 'ml-7'}
                
                `}
            fullWidth
            blurred={true}
        >
            <div className="flex justify-between gap-6 flex-row md:flex-row md:items-center">
                <div className="capitalize flex flex-row items-center gap-4">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid "
                        onClick={() => setIsSideBarOpen(!isSidebarOpen)}
                    >
                        <Bars3Icon strokeWidth={3} className={`${fontColor} h-6 w-6`} />
                    </IconButton>
                    <Breadcrumbs
                        className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
                            } hidden xl:block md:block`}
                    >
                        <Link to={`/${layout}`}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className={`${fontColor} font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100`}
                            >
                                {layout || ' '}
                            </Typography>
                        </Link>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className={`${fontColor} font-normal`}
                        >
                            {page || ' '}
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" color="blue-gray">
                        {page || ' '}
                    </Typography>
                </div>
                <div className="flex items-center relative">
                    <div className="mr-auto md:mr-4 md:w-56 hidden md:block xl:block">
                        <Input label="Search..." className={`border-white `} />
                    </div>
                    <IconButton variant="text" onClick={() => dispatch(setMode())}>
                        {mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    {/* <DarkModeOutlined sx={{ fontSize: "25px" }} /> */}
                    {/* <Button onClick={() => dispatch(setMode())}>Switch</Button> */}

                    {/* <Link to="/auth/sign-in">
                        <Button
                            variant="text"
                            color="blue-gray"
                            className="hidden items-center gap-1 px-4 xl:flex"
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                            Sign In
                        </Button>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            className="grid xl:hidden"
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                        </IconButton>
                    // </Link> */}
                    <IconButton
                        variant="text"
                        color="blue-gray"
                    // onClick={() => setOpenConfigurator(dispatch, true)}
                    >
                        <Cog6ToothIcon className={`${fontColor} h-5 w-5`} />
                    </IconButton>


                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                                <BellIcon className={`${fontColor} h-5 w-5`} />
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="w-max border-0">
                            <MenuItem className="flex items-center gap-3">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New message</strong> from Laur
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New album</strong> by Travis Scott
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                                    <CreditCardIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        Payment successfully completed
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                                    </Typography>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Profile menu */}
                    <Menu className="">
                        <MenuHandler>
                            <Avatar
                                src={user.profileImage ? "http://localhost:5001/user-uploads/images/" + user.profileImage : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}
                                alt="item-1"
                                size="sm"
                                variant="circular"
                            />
                        </MenuHandler>
                        <MenuList className="border-0 mr-10">
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate('profile')
                            }} className="flex items-center">
                                <ListItemIcon>
                                    <AccountCircle fontSize="medium" />
                                </ListItemIcon>
                                Profile

                            </MenuItem>

                            {/* <Divider /> */}

                            <MenuItem onClick={handleClose} sx={{ height: '50px' }} className="flex items-center">
                                <ListItemIcon>
                                    <Settings fontSize="medium" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose()
                                authService.Logout(navigate, setUserData)
                            }} sx={{ height: '50px' }} className="flex items-center">

                                <ListItemIcon>
                                    <Logout fontSize="medium" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </Navbar >
    );
}

// Navbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
