import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import LogoLight from "@/assets/LogoLight.png"
import LogoDark from "@/assets/LogoDark.png"
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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import { useTheme } from "@mui/material";
import { authService } from "@/services/authService";
import useAuth from "@/hooks/useAuth";
import useGetTheme from "@/hooks/useGetTheme";
// import { useMaterialTailwindController, setOpenSidenav } from "@/context";

const icon = {
  className: "w-5 h-5 text-inherit",
};


const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Journal",
        path: "/journal",
      },
      // {
      //   icon: <SummarizeIcon {...icon} />,
      //   name: "Summary",
      //   path: "/summary",
      // },
      {
        icon: <ShowChartIcon {...icon} />,
        name: "Equity Curve",
        path: "/equity-chart",
      },


    ],
  },
  {
    title: "Analysis",
    layout: "dashboard",
    pages: [
      {
        icon: <AnalyticsIcon {...icon} />,
        name: "Fundamentals",
        path: "/fundamental",
      },
      // {
      //   icon: <BiotechIcon {...icon} />,
      //   name: "Technical",
      //   path: "/technical",
      // },
    ],
  },
  {
    title: "Space",
    layout: "dashboard",
    pages: [
      {
        icon: <ConnectWithoutContactIcon {...icon} />,
        name: "Posts",
        path: "/posts",
      },

    ],
  },
  {
    title: "Premium",
    layout: "dashboard",
    pages: [
      {
        icon: <WorkspacePremiumIcon {...icon} />,
        name: "Subscription",
        path: "/premium",
      },

    ],
  },
  {
    title: "User",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
      },
      {
        icon: <LogoutIcon />,
        name: "Logout",
        path: "/logout",
      },
    ],
  },
];


const Sidebar = ({ isSidebarOpen, isNonMobile, mode }) => {

  const theme = useGetTheme()
  const { setUserData } = useAuth()
  const navigate = useNavigate()

  // alternatives for passed in props
  const openSidenav = true
  const sidenavType = "white"
  const sidenavColor = "blue"


  const sidenavTypes = {
    dark: mode === "dark" ? "bg-[#1E1F26]" : "bg-white",
    white: "bg-white shadow-2xl",
    transparent: "bg-transparent",
  };

  // ${mode === "dark" ? 'bg-[#282733]' : 'bg-white'} shadow-lg  -- Sidebar background

  return (
    <aside
      // ${mode === "dark" ? 'bg-[#11101d]' : 'bg-[#f3f6fd]'}
      className={`
       fixed inset-0 z-50 my-4 ml-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#359AEF] scrollbar-track-[${theme.palette.custom[300]}] scrollbar-thumb-rounded-md w-64 rounded-xl duration-300 
      ${!isSidebarOpen ? '-translate-x-80' : null} transition-all`}
    >
      <div
        className={`relative border-0 ${mode === "dark" ? "border-white/50" : "border-black/50"
          }`}
      >
        <Link to="/" className="flex items-center gap-4 pb-8 px-8">
          {/* <img src={mode === "dark" ? LogoDark : LogoLight} alt="avatar" /> */}
          <h2 className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} font-semibold text-4xl mt-4`}><strong className="text-[#379CF0]">Fx </strong>Edge <div className="w-[15px] h-[15px] bg-[#379CF0] inline-block rounded-full"></div></h2>
          {/* <h2 className="text-gray-900 font-semibold text-5xl mt-4">FxEdge <div className="w-[15px] h-[15px] bg-[#0284c7] inline-block rounded-full"></div></h2> */}
          {/* <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
           
          </Typography> */}
        </Link>
        {/* <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        // onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton> */}
      </div>
      <div className="m-4 mt-0">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  // color={sidenavType === "dark" ? "white" : "blue-gray"}
                  color={mode === "dark" ? "white" : "blue-gray"}
                  // color={theme.palet
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      onClick={() => {
                        if (name === 'Logout') {
                          console.log('Logging out');
                          authService.Logout(navigate, setUserData)
                        }
                      }}
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className={`flex items-center gap-4 px-4 capitalize `}
                      fullWidth
                    >
                      {icon}
                      <Typography
                        // color={mode === "dark" ? "#f9fafb" : "#0f172a"}
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

// Sidenav.defaultProps = {
//   brandImg: "/img/logo-ct.png",
//   brandName: "Material Tailwind React",
// };

// Sidenav.propTypes = {
//   brandImg: PropTypes.string,
//   brandName: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidebar;
