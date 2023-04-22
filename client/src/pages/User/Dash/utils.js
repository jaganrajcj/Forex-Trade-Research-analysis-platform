export const calculateMonthPercentageDifference = (trades) => {
    let currentMonthBalance = 0;
    let previousMonthBalance = 0;

    // get current month's balance
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentMonthObjects = trades.filter((trade) => new Date(trade.date).getMonth() + 1 === currentMonth);

    if (currentMonthObjects.length > 0) {
        currentMonthBalance = currentMonthObjects.reduce((max, trade) => (trade.balance > max ? trade.balance : max), -Infinity);
    }

    // get previous month's balance
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousMonthObjects = trades.filter((trade) => new Date(trade.date).getMonth() + 1 === previousMonth);

    if (previousMonthObjects.length > 0) {
        previousMonthBalance = previousMonthObjects.reduce((max, trade) => (trade.balance > max ? trade.balance : max), -Infinity);
    }

    if (currentMonthBalance === 0) currentMonthBalance = previousMonthBalance

    // calculate percentage difference
    const percentageDifference = ((currentMonthBalance - previousMonthBalance) / previousMonthBalance) * 100;

    return percentageDifference.toFixed(1);
}

export const getTradeCountPercentageChange = (trades) => {
    // Create an object to hold the number of trades for each month
    const tradesByMonth = {};

    // Group trades by month
    trades.forEach((trade) => {
        const month = trade.date.substr(0, 7);
        if (!tradesByMonth[month]) {
            tradesByMonth[month] = [];
        }
        tradesByMonth[month].push(trade);
    });

    // Get current and previous month's number of trades
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().substr(0, 7);
    const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().substr(0, 7);
    const currentMonthTradeCount = tradesByMonth[currentMonth] ? tradesByMonth[currentMonth].length : 0;
    const previousMonthTradeCount = tradesByMonth[previousMonth] ? tradesByMonth[previousMonth].length : 0;

    // Calculate percentage change
    const percentageChange = ((currentMonthTradeCount - previousMonthTradeCount) / previousMonthTradeCount) * 100;

    return percentageChange.toFixed(1);
}

export const calculateWinPercentageChange = (trades) => {
    // Create an object to group trades by month
    const groupedTrades = {};
    trades.forEach(trade => {
        const month = trade.date.substr(0, 7);
        if (!groupedTrades[month]) {
            groupedTrades[month] = [];
        }
        groupedTrades[month].push(trade);
    });

    // Get the number of winning trades for the current month and previous month
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().substr(0, 7);
    const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().substr(0, 7);
    const currentWinningTrades = groupedTrades[currentMonth].filter(trade => trade.status === "Win");
    const previousWinningTrades = groupedTrades[previousMonth].filter(trade => trade.status === "Win");

    // Calculate the percentage change
    const percentageChange = ((currentWinningTrades.length - previousWinningTrades.length) / previousWinningTrades.length) * 100;

    return percentageChange.toFixed(1);
}

export const calculateLossPercentageChange = (trades) => {
    // Create an object to group trades by month
    const groupedTrades = {};
    trades.forEach(trade => {
        const month = trade.date.substr(0, 7);
        if (!groupedTrades[month]) {
            groupedTrades[month] = [];
        }
        groupedTrades[month].push(trade);
    });

    // Get the number of winning trades for the current month and previous month
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().substr(0, 7);
    const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().substr(0, 7);
    const currentWinningTrades = groupedTrades[currentMonth].filter(trade => trade.status === "Loss");
    const previousWinningTrades = groupedTrades[previousMonth].filter(trade => trade.status === "Loss");

    // Calculate the percentage change
    const percentageChange = ((currentWinningTrades.length - previousWinningTrades.length) / previousWinningTrades.length) * 100;

    return percentageChange.toFixed(1);
}

export const calculateWinRate = (trades) => {
    // create an object to group trades by month
    const tradesByMonth = trades.reduce((acc, trade) => {
        const month = trade.date.substr(0, 7); // extract the year and month from the date
        acc[month] = acc[month] || [];
        acc[month].push(trade);
        return acc;
    }, {});

    // get the current month and previous month from the tradesByMonth object
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().substr(0, 7);
    const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().substr(0, 7);

    // get the count of wins and total trades for the previous month
    const previousMonthTrades = tradesByMonth[previousMonth] || [];
    const previousMonthWins = previousMonthTrades.filter(trade => trade.status === 'Win').length;
    const previousMonthTotal = previousMonthTrades.length;

    // calculate the win rate for the previous month
    const previousMonthWinRate = previousMonthTotal > 0 ? (previousMonthWins / previousMonthTotal) * 100 : 0;

    return previousMonthWinRate.toFixed(1);
}