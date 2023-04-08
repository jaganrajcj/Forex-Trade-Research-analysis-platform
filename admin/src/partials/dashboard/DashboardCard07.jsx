import React from 'react';

function DashboardCard07({ data }) {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">User</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Plan</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Method</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {
                data?.map((row, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">
                        {/* {
                          row.profileImage && <img src={row.profileImage}
                        } */}
                        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                          <circle fill="#0E2439" cx="18" cy="18" r="18" />
                          <path d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z" fill="#E6ECF4" />
                        </svg>
                        <div className="text-slate-800">{row.firstName + ' ' + row.lastName}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{row.amount === 5 ? "Monthly" : "Yearly"}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{row.amount}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{row.method}</div>
                    </td>
                    <td className="p-2">
                      <div className={`text-center ${row.status === 'success' ? 'text-green-500' : 'text-red-500'} `}>{row.status}</div>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
