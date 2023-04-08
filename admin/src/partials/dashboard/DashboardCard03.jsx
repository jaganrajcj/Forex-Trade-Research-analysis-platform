import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-04.jpg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard03({ stat }) {

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
        data: [],
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
    if (stat?.sales?.salesData?.length > 0) {

      const dataSet = stat?.sales?.salesData?.map(data => data.count);
      const dates = stat?.sales?.salesData?.map(data => data.month)


      const oldState = { ...chartData }

      oldState.datasets[0].data = dataSet
      // oldState.labels = dates

      setChartData(oldState)

    }
  }, [stat])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 03" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Total Revenue</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Revenue from Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">${stat?.sales?.totalRevenue?.toLocaleString() || 0}</div>
          <div className={`text-sm font-semibold text-white px-1.5 ${stat?.percChange < 0 ? 'bg-red-500' : 'bg-green-500'} rounded-full`}>{stat?.sales?.change || 0}%</div>
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

export default DashboardCard03;
