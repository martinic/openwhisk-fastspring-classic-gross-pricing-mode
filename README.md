# openwhisk-fastspring-classic-gross-pricing-mode
[![Greenkeeper badge](https://badges.greenkeeper.io/martinic/openwhisk-fastspring-classic-gross-pricing-mode.svg)](https://greenkeeper.io/)

An OpenWhisk FastSpring classic gross pricing mode for Contextual Stores. Exchange Rates are coming from the European Central Bank on a hourly basis. So scheduling this script once per hour is good enough.

## Prerequisites
- OpenWhisk command line interface (CLI) called `wsk`
- npm install -g bestzip

## Installation
- npm install
- npm run create

##usege
- npm run update (Only for development)
- npm run invoke

or with node.js

- node index.js params.json

## config

json input (`params.json`)
```
{
  "credentials": {
    "username": "NVC9SLWFTU-NJYEB9DIUSW",
    "password": "BXpeGA_aQVmm9zXLP_YwEQ"
  },
  "settings":{
    "price_decoration": false,
    "base_currency": "USD",
    "currencies": ["JPY","CNY","SGD","CZK","HKD","MXN","COP","CAD","ZAR","NZD","AUD","CLP","GBP","DKK","SEK","BRL","CHF","EUR","RUB","PLN","INR","USD","KRW"]
  }
}
```
