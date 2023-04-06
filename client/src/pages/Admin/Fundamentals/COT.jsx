import React from 'react'
import FlexBetween from '@/components/FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import useAuth from '@/hooks/useAuth';

const COT = () => {

    const theme = useTheme()
    const { userData } = useAuth()

    const props = {
        name: 'cotFile',
        action: `${import.meta.env.VITE_API_URL}/analysis/fundamental/cot/update`,
        headers: {
            'x-auth-token': userData.token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} COT Data updated`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} Couldn't update COT Data.`);
            }
        },
    };

    return (
        <Box sx={{ mx: '1.2rem', mt: '.8rem', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
            <FlexBetween sx={{ mx: 'rem', mb: '.4rem' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.secondary[100] }}>
                    {/* {title} */}
                    Commitment Of Traders
                </Typography>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </FlexBetween>
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                {/* {title} */}
                <strong>Last Updated</strong>: <i>{'12-04-2002'}</i>
            </Typography>
            <FlexBetween sx={{ mt: '10px' }}>
                <Upload {...props}>
                    <Button style={{ color: theme.palette.secondary[200] }} icon={<UploadOutlined />}>Add new data</Button>
                </Upload>
            </FlexBetween>
        </Box>
    )
}

export default COT