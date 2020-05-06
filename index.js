const _ = require('lodash')
const axios = require('axios');
const express = require('express');

const app = express();
const COMPANY_SYMBOL_FETCH = "https://financialmodelingprep.com/api/v3/stock/real-time-price";
const COMPANY_PROFILE_FETCH = "https://financialmodelingprep.com/api/v3/company/profile";
const port = 9980;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello! This is a stock price fetching API.");
});

app.get("/prices", async (req, res) => {
    // get parameters from query string
    const pageNo = req.query.pageNo;
    const pageSize = req.query.pageSize;

    let symbols, prices = [];
    const response = await axios.get(COMPANY_SYMBOL_FETCH);
    let data = response.data.stockList.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    symbols = data.map(item => (item.symbol));

    prices = await Promise.all(symbols.map(async (symbol) => {
        const response = await axios.get(`${COMPANY_PROFILE_FETCH}/${symbol}`);
        let data = response.data;
        return {
            symbol: data.symbol,
            price: data.profile.price,
            changes: `${data.profile.changes} ${data.profile.changesPercentage}`,
            name: data.profile.companyName
        };
    }));

    res.send(prices);
})

app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);