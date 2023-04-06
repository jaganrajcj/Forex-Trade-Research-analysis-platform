


export const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        sortable: false,
        align: 'center'
    },
    {
        field: 'date',
        headerName: 'Date',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'direction',
        headerName: 'Direction',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'market',
        headerName: 'Market',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'entry',
        headerName: 'Entry Price',
        type: 'number',
        sortable: false,
        editable: false,
        align: 'center'
    },
    {
        field: 'balance',
        headerName: 'Balance',
        sortable: false,
        align: 'center'
    },
    {
        field: 'size',
        headerName: 'Lot Size',
        sortable: false,
        align: 'center'
        // renderCell: renderDetailsButton,
    },
    {
        field: 'sl',
        headerName: 'Stop Loss',
        type: 'number',
        editable: true,
        flex: 0,
        align: 'center'
    },
    {
        field: 'target',
        headerName: 'Target',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'exit',
        headerName: 'Actual Exit',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'pnl',
        headerName: 'Closed Pnl',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'change',
        headerName: 'Account Change',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: false,
        editable: true,
        align: 'center',
        renderCell: renderStatus,
    },
    {
        field: 'note',
        headerName: 'Notes',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        width: 180,
        align: 'center',
        renderCell: renderDetailsButton,
    },
];
export const rows = [
    { id: 1, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 2, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 3, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
    { id: 4, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 5, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
    { id: 6, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 7, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
    { id: 8, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 9, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
    { id: 10, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null }

];