import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Monthly from './Monthly'
import Yearly from './Yearly'


const Report = () => {

    const activeClass = `text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500`
    const location = useLocation()


    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const pathArray = location.pathname.split('/')

        if (!pathArray[3]) setActiveTab(1)
        else if (pathArray[3] === 'monthly') setActiveTab(1)
        else if (pathArray[3] === "yearly") setActiveTab(2)
        else if (pathArray[3] === "all") setActiveTab(3)

        console.log(activeTab)
    }, [location.pathname])

    return (
        <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-10xl mx-auto h-[90%]">
            <div className="flex justify-between items-center mb-3 w-full">
                <h2 className="text-2xl font-bold capitalize">SALES CHART</h2>
            </div>

            <div className="">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-200">
                    <ul className="flex flex-wrap -mb-px items-center">
                        <li className="mr-2">
                            <Link to={`/sales/report/monthly`} className={`${activeTab === 1 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`}>Monthly</Link>
                        </li>
                        <li className="mr-2">
                            <Link to={`/sales/report/yearly`} className={`${activeTab === 2 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`} aria-current="page">Yearly</Link>
                        </li>
                        <div className="mt-0">
                            <select id="countries" className="border-l bg-transparent border-0 w-[10rem] border-gray-300 text-gray-900 text-sm  focus:ring-transparent focus:border-transparent  focus:border-l-gray-300 block p-2.5">
                                <option className="h-[50px] p-10" selected>Line Chart</option>
                                <option value="US">Bar Chart</option>

                            </select>
                        </div>
                        {/* <li className="mr-2">
                            <Link to={`/sales/data/all`} className={`${activeTab === 3 ? activeClass : null} inline-block p-4 border-b-2 border-transparent rounded-t-lg text-gray-700 hover:text-gray-600 active hover:border-gray-300 dark:hover:text-gray-300`}>All transactions</Link>
                        </li> */}

                    </ul>
                </div>

                <Routes>
                    <Route index element={<Monthly />} />
                    <Route path="monthly" element={<Monthly />} />
                    <Route path="yearly" element={<Yearly />} />
                    <Route path="all" element={<></>} />
                </Routes>
            </div>

        </div >
    )
}

export default Report