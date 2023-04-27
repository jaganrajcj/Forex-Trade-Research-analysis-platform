import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react'
import {
    Cog6ToothIcon,
    PencilIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import ProfileView from './ProfileView'
import ProfileEdit from "./ProfileEdit";
import Settings from "./Settings";

const Profile = () => {

    const [user, setUser] = useState({})
    const mode = useSelector((state) => state.global.mode)
    const [file, setFile] = useState(null)
    const [value, setValue] = useState();
    const [currentTab, setCurrentTab] = useState(0)
    const fontColor = mode === "dark" ? 'white' : 'blue-gray'

    const { userData, setUserData } = useAuth()

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
    }, [])


    const handleFileChange = async (event) => {
        setFile(event.target.files[0])
        const formData = new FormData();

        formData.append('photo', event.target.files[0]);

        console.log("File")
        const result = await axios.post(import.meta.env.VITE_API_URL + '/users/update/profile-image',
            formData,
            { headers: { "x-auth-token": userData.token, "Content-Type": "multipart/form-data" } })

        if (result.data.status) fetchUser()

    }

    const handleFileSubmit = async () => {

    }


    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2130&q=80)] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/25" />
            </div>
            <Card className={`mx-3 -mt-16 mb-6 lg:mx-4 ${mode === "dark" ? "bg-[#282733]" : "bg-white"}`}>
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar
                                    src={user.profileImage ? import.meta.env.VITE_SERVER_URL + "/user-uploads/images/" + user.profileImage : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}
                                    alt="bruce-mars"
                                    size="xl"
                                    className="rounded-full shadow-md  shadow-blue-gray-500/10"
                                />
                                <form onSubmit={handleFileSubmit} encType='multipart/form-data' id="fileForm">
                                    <input className="hidden" id="fileInput" name="photo" type="file" onChange={handleFileChange} />
                                    <label htmlFor="fileInput" className="absolute w-[25px] h-[25px] rounded-full bg-[#cac1c1] flex justify-center items-center bottom-0 right-0 shadow-md" >
                                        <EditIcon fontSize="small" />
                                    </label>
                                </form>
                                {/* <div className="w-[25px] h-[25px] rounded-full bg-white absolute flex align-center justify-center bottom-0 right-0">
                                </div> */}
                            </div>

                            <div>
                                <Typography variant="h5" color={fontColor} className="mb-1">
                                    {user?.firstName ? (user?.lastName ? user?.firstName + ' ' + user?.lastName : user?.firstName) : user?.email?.substring(0, user?.email.indexOf("@"))}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {'@' + user?.name || ''}
                                </Typography>
                            </div>
                        </div>
                        <div className="w-96">
                            <Tabs value={currentTab} >
                                <TabsHeader>
                                    <Tab value={0} onClick={() => setCurrentTab(0)}>
                                        <UserCircleIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        Profile
                                    </Tab>
                                    <Tab value={1} onClick={() => setCurrentTab(1)}>
                                        <PencilIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                        Edit
                                    </Tab>
                                    <Tab value={2} onClick={() => setCurrentTab(2)}>
                                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        Settings
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div>
                    </div>
                    {
                        currentTab == 0 ? <ProfileView mode={mode} user={user} fontColor={fontColor} setCurrentTab={setCurrentTab} />
                            : (currentTab == 1 ? <ProfileEdit mode={mode} user={user} fontColor={fontColor} fetchUser={fetchUser} /> : <Settings />)
                    }
                    {/* <ProfileView mode={mode} user={user} fontColor={fontColor} /> */}

                </CardBody>
            </Card>
        </>
    )
}

export default Profile
