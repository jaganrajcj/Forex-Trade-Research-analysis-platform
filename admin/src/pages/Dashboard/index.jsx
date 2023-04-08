import React, { useEffect, useState } from 'react';
import CircularLoader from '@/partials/CircularLoader'

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import FilterButton from '../../partials/actions/FilterButton';
import Datepicker from '../../partials/actions/Datepicker';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../../partials/dashboard/DashboardCard13';
import Banner from '../../partials/Banner';

import { dashboardServices } from './services';
import useAuth from '../../hooks/useAuth';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData } = useAuth()
  const [stat, setStat] = useState({})
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getStat = async () => {
    const res = await dashboardServices.getStatCardData(userData)

    const dashStat = await dashboardServices.getDashboardInfo(userData)
    setData(dashStat)
    setStat(res)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    console.log(dashStat)

  }
  useEffect(() => {
    getStat()
  }, [])

  return (
    !isLoading ?
      <>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Get Report</span>
                </button>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <DashboardCard01 stat={stat} />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 stat={stat} />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 stat={stat} />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 stat={stat} />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 data={data?.sales} />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 data={data?.topCountries} />
              {/* Table (Top Channels) */}
              <DashboardCard07 data={data?.recentTransactions} />
              {/* Line chart (Sales Over Time) */}

              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
              {/* Card (Customers) */}
              {/* <DashboardCard10 /> */}
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}

            </div>

          </div>
        </main>
      </>
      : <CircularLoader />

  );
}

export default Dashboard;