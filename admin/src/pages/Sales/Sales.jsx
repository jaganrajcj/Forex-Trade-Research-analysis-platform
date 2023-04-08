import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import All from './Reports/All'
import AllPayments from './Reports/AllPayments'
import Disputes from './Reports/Disputes'

const Sales = () => {

    const activeClass = `text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500`
    const location = useLocation()


    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const pathArray = location.pathname.split('/')

        if (!pathArray[3]) setActiveTab(1)
        else if (pathArray[3] === 'all-payments') setActiveTab(1)
        else if (pathArray[3] === "disputes") setActiveTab(2)
        else if (pathArray[3] === "all") setActiveTab(3)

        console.log(activeTab)
    }, [location.pathname])

    return (
        <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-10xl mx-auto h-[90%]">
            <div className="flex justify-between items-center mb-3 w-full">
                <h2 className="text-2xl font-bold capitalize">SALES</h2>
            </div>

            <div className="">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-200">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                            <Link to={`/sales/data/all-payments`} className={`${activeTab === 1 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`}>All Payments</Link>
                        </li>
                        <li className="mr-2">
                            <Link to={`/sales/data/disputes`} className={`${activeTab === 2 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`} aria-current="page">Disputes</Link>
                        </li>
                        <li className="mr-2">
                            <Link to={`/sales/data/all`} className={`${activeTab === 3 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`}>All transactions</Link>
                        </li>

                    </ul>
                </div>

                <Routes>
                    <Route index element={<AllPayments />} />
                    <Route path="all-payments" element={< AllPayments />} />
                    <Route path="disputes" element={<Disputes />} />
                    <Route path="all" element={<All />} />
                </Routes>
            </div>

        </div >
    )
}

export default Sales