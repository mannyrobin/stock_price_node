This is a stock price API built with Node.js and Docker

1. Port: 9980

2. API Endpoint
- <server>:9980/
Returns "Hello! This is a stock price fetching API."
- <server>:9980/prices
Query String Parameter
pageNo: Number of page starting from 1.
pageSize: Number of companies per page.
- Output Data
[
    {
        <symbol>: abbreviation of company name
        <price>: current stock price
        <changes>: changed ratio and price like x.xx$ (+/- y.yy%)
        <name>: company full name
    }
]