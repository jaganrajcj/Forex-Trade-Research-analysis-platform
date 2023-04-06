import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04({ stat }) {

  function getLast6Months() {
    const labels = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const formattedDate = `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getFullYear()}`;
      labels.push(formattedDate);
    }
    return labels;
  }

  const [chartData, setChartData] = useState({
    labels: getLast6Months(),
    datasets: [
      // Light blue bars
      {
        label: 'Direct',
        data: [],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Indirect',
        data: [],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  });

  useEffect(() => {
    const basicUsers = stat?.userChartData?.map(user => user.count).slice(-6)
    const premiumUsers = stat?.premiumUsers?.map(user => user.count).slice(-6)

    const oldState = { ...chartData }
    oldState.datasets[0].data = basicUsers
    oldState.datasets[1].data = premiumUsers

    setChartData(oldState)

  }, [stat])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Basic VS Premium Users</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
