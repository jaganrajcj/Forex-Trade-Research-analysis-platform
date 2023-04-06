import React from 'react'
import {
    Tooltip,
} from "@material-tailwind/react";
import {
    PencilIcon,
} from "@heroicons/react/24/solid";
import ProfileInfoCard from "@/widgets/cards/ProfileInfoCard";


const ProfileView = ({ mode, user, fontColor, setCurrentTab }) => {
    return (
        <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
                title="PRIVATE INFORMATION"

                details={{

                    "first name": user?.firstName ? user.firstName : '',
                    "last name": user?.lastName ? user.lastName : '',
                    mobile: user?.phone ? user.phone : '',
                    email: user?.email ? user.email : '',
                }}

                mode={mode}
                fontColor={fontColor}
            />
            <ProfileInfoCard
                title="PUBLIC INFORMATION"
                description={user?.about ? user.about : ''}
                details={{
                    Username: user?.name ? user.name : '',
                    location: user?.location ? user.location : '',
                }}

                mode={mode}
                fontColor={fontColor}
            />

        </div>
    )
}

export default ProfileView