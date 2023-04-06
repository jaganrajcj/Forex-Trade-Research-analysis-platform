import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02({ stat }) {

  const [chartData, setChartData] = useState({
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      // '12-01-2021', '01-01-2022', '02-01-2022',
      // '03-01-2022', '04-01-2022', '05-01-2022',
      // '06-01-2022', '07-01-2022', '08-01-2022',
      // '09-01-2022', '10-01-2022', '11-01-2022',
      // '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
      // Gray line

    ],
  });

  useEffect(() => {
    if (stat?.premiumUsers?.length > 0) {

      const dataSet = stat?.premiumUsers?.map(user => user.count);

      const oldState = { ...chartData }

      oldState.datasets[0].data = dataSet

      setChartData(oldState)

    }
  }, [stat])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 max-h-[295px]">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <svg className='h-9 w-9' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g opacity="0.15"> <path d="M12.0504 20.9999C12.0336 21 12.0168 21 12 21C11.9832 21 11.9664 21 11.9496 20.9999C11.9666 20.9832 11.9834 20.9664 12 20.9495C12.0166 20.9664 12.0334 20.9832 12.0504 20.9999Z" fill="#818cf8"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9936 18.7141C17.9978 18.6433 18 18.5719 18 18.5C18 16.567 16.433 15 14.5 15H9.5C7.567 15 6 16.567 6 18.5C6 18.5719 6.00217 18.6433 6.00644 18.7141C4.16145 17.0659 3 14.6686 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.6686 19.8385 17.0659 17.9936 18.7141ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="#818cf8"></path> </g> <path d="M18 18.7083C18 17.0886 16.8283 15 15 15H9C7.17172 15 6 17.0886 6 18.7083M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#818cf8" stroke-width="1.5"></path> </g></svg>
          {/* Menu button */}
          {/* <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu> */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Premium Users</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Number of premiums users</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{stat?.userStat?.premiumUsers || 0}</div>
          <div className={`text-sm font-semibold text-white px-1.5 ${stat?.percChange < 0 ? 'bg-red-500' : 'bg-green-500'} rounded-full`}>{stat?.premiumUserChange || 0}%</div>
          <div className="text-sm font-semibold ml-2 text-slate-500">From last month</div>

        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard02;
