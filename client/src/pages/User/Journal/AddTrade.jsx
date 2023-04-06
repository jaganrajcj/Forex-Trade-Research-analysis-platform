import React, { useState } from 'react'
import { Box, InputBase, Modal, TextField, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Input } from "@material-tailwind/react";
import { Textarea, Typography, Button, Tooltip, Select, Option } from "@material-tailwind/react";
import { TransitionGroup } from 'react-transition-group';
// import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import { journal } from '@/services/journal'


import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import useAuth from '@/hooks/useAuth';
import useGetTheme from '@/hooks/useGetTheme';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    // width: '1000px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};



const AddTrade = ({ modalOpen, handleModalClose, setTrades, setSnackbar, summary }) => {

    const theme = useGetTheme()
    const [tradeData, setTradeData] = useState({})
    const [errors, setErrors] = useState({})
    const { userData } = useAuth()

    const fontColor = theme.palette.mode === "dark" ? '#f8fafc' : '#475569'

    return (
        <Grow
            in={modalOpen}

            {...(modalOpen ? { timeout: 1000 } : {})}
        >
            <Box sx={{ display: !modalOpen ? 'none' : null }} className="AddTradeBox">
                <Typography id="modal-modal-title" variant="h4" component="h4" className={`${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}>
                    Journal new trade
                </Typography>

                <div className="gird-cols-1 mb-10 mt-10 grid gap-7 px-4 lg:grid-cols-2 xl:grid-cols-3 ">
                    <Box sx={{ width: '80%', }}>
                        <ul className="flex flex-col gap-5 p-0">
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    // sx={{ color: fontColor, width: '100px' }}
                                    // style={{ text: fontColor }}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}
                                >
                                    Date
                                </Typography>
                                <Input type="date" label="date" error={errors?.date}
                                    icon={errors?.date ? <Tooltip content="You cannot add trades of a future date"><ErrorIcon /></Tooltip> : null}
                                    onChange={(e) => {
                                        const today = new Date();
                                        const pickedDay = new Date(e.target.value);
                                        if (today < pickedDay) {
                                            setErrors({ ...errors, date: true });
                                            setTradeData({ ...tradeData, date: undefined });
                                        }
                                        else {
                                            setErrors({ ...errors, date: false });
                                            setTradeData({ ...tradeData, date: e.target.value });
                                        }
                                    }}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                />

                                {/* <p>Error</p> */}
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Market
                                </Typography>
                                <Input label="Market"
                                    error={errors?.market}
                                    icon={errors?.market ? <Tooltip content="Market name can only contain alphabets and numbers, and must be less than 10 characters!"><ErrorIcon /></Tooltip> : null}
                                    onChange={(e) => {
                                        if (/^[a-zA-Z0-9]{1,10}$/.test(e.target.value)) {
                                            setErrors({ ...errors, market: false });
                                            setTradeData({ ...tradeData, market: e.target.value });
                                        }
                                        else {
                                            setErrors({ ...errors, market: true });
                                            setTradeData({ ...tradeData, market: undefined });
                                        }
                                    }}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Entry Price
                                </Typography>
                                <Input label="Entry Price" type="number"
                                    error={errors?.entry}
                                    icon={errors?.entry ? <Tooltip content="Entry price cannot be less than or equal to zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, entry: false });
                                            setTradeData({ ...tradeData, entry: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, entry: true });
                                            setTradeData({ ...tradeData, entry: undefined });
                                        }
                                    }}
                                />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Direction
                                </Typography>
                                <Select label="Trade Direction" onChange={(e) => setTradeData({ ...tradeData, direction: e })}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}>
                                    <Option value="Long">Long</Option>
                                    <Option value="Short">Short</Option>
                                </Select>
                            </li>
                        </ul>
                        {/* <Input label="Username" /> */}
                    </Box>
                    <Box sx={{ width: '80%' }}>
                        <ul className="flex flex-col gap-4 p-0">
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Balance
                                </Typography>
                                <Input label="Account Balance"
                                    error={errors?.balance}
                                    // disabled={summary?.currentBalance === 0 || !summary?.currentBalance ? false : true}
                                    defaultValue={summary.currentBalance}
                                    icon={errors?.balance ? <Tooltip content="Balance must be greater than zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, balance: false });
                                            setTradeData({ ...tradeData, balance: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, balance: true });
                                            setTradeData({ ...tradeData, balance: undefined });
                                        }
                                    }}
                                />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Size
                                </Typography>
                                <Input label="Lot size"
                                    error={errors?.size}
                                    icon={errors?.size ? <Tooltip content="Size must be greater than zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, size: false });
                                            setTradeData({ ...tradeData, size: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, size: true });
                                            setTradeData({ ...tradeData, size: undefined });
                                        }
                                    }} />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Stop Loss
                                </Typography>
                                <Input label="Stop Loss"
                                    error={errors?.sl}
                                    icon={errors?.sl ? <Tooltip content="Stop Loss price must be greater than zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, sl: false });
                                            setTradeData({ ...tradeData, sl: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, sl: true });
                                            setTradeData({ ...tradeData, sl: undefined });
                                        }
                                    }} />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Target
                                </Typography>
                                <Input label="Target Price"
                                    error={errors?.target}
                                    icon={errors?.target ? <Tooltip content="Target price must be greater than zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, target: false });
                                            setTradeData({ ...tradeData, target: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, target: true });
                                            setTradeData({ ...tradeData, target: undefined });
                                        }
                                    }}
                                />
                            </li>
                        </ul>
                        {/* <Input label="Username" /> */}
                    </Box>
                    <Box sx={{ width: '80%' }}>
                        <ul className="flex flex-col gap-4 p-0 ">
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Actual Exit
                                </Typography>
                                <Input label="Actual Exit"
                                    error={errors?.exit}
                                    icon={errors?.exit ? <Tooltip content="Square off price must be greater than zero!"><ErrorIcon /></Tooltip> : null}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                    onChange={(e) => {
                                        // console.log(typeof e.target.value)
                                        if (parseFloat(e.target.value) > 0) {
                                            setErrors({ ...errors, exit: false });
                                            setTradeData({ ...tradeData, exit: parseFloat(e.target.value) });
                                        }
                                        else {
                                            setErrors({ ...errors, exit: true });
                                            setTradeData({ ...tradeData, exit: undefined });
                                        }
                                    }}
                                />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    P&L
                                </Typography>
                                <Input label="Closed P&L"
                                    onChange={(e) => setTradeData({ ...tradeData, closedPnl: parseFloat(e.target.value) })}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                />
                            </li>
                            <li className="flex items-center justify-between gap-4 w-[100%]">
                                <Typography
                                    variant="small"
                                    fontWeight="light"
                                    // color={fontColor}
                                    className={`w-[100px] ${theme.palette.mode === "dark" ? 'text-[#8f979e]' : 'text-[#475569]'}`}

                                >
                                    Note
                                </Typography>
                                <Textarea label="Note"
                                    onChange={(e) => setTradeData({ ...tradeData, notes: e.target.value })}
                                    className={`${theme.palette.mode === "dark" ? 'text-[#dbe0e4]' : 'text-[#475569]'}`}
                                />
                            </li>
                            <li >
                                <div className="flex justify-end gap-4 w-[100%] px-4">
                                    <Button variant="text" color="red" onClick={() => {
                                        handleModalClose();
                                        setTradeData({})
                                        setErrors({})
                                    }}>Close</Button>
                                    <Button variant='gradient' onClick={() => {
                                        setTradeData({ ...tradeData, balance: summary.currentBalance });
                                        setTimeout(() => {
                                            if (Object.keys(tradeData).length == 11) {
                                                let isError = false
                                                // console.log('Inserting trade data')
                                                Object.keys(errors).forEach((err) => {
                                                    // console.log(errors[err])
                                                    if (errors[err]) {
                                                        // console.log('Error input: ', err);
                                                        isError = true;
                                                        return false;
                                                    }
                                                });
                                                // console.log("isError", isError);
                                                if (!isError) journal.insertTrade(userData, tradeData).then((res) => {
                                                    setTrades(res.result.data.result.trades)
                                                    setSnackbar({
                                                        open: true,
                                                        severity: 'success',
                                                        message: 'Trade added successfully'
                                                    })
                                                    // console.log()
                                                }).catch((err) => {
                                                    console.log(err);
                                                    setSnackbar({
                                                        open: true,
                                                        severity: 'error',
                                                        message: 'Failed to add trade'
                                                    })
                                                    // Add snackbar
                                                })
                                            }
                                            else {
                                                console.log('Fill all inputs')
                                                // Add snackbar
                                            }
                                        }, 400)

                                    }}>Add</Button>
                                </div>
                            </li>
                        </ul>
                        {/* <Input label="Username" /> */}
                    </Box>
                </div>

            </Box >
        </Grow >
        // </Modal >
    )
}

export default AddTrade