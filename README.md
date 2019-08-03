# openwhisk-fastspring-classic-gross-pricing-mode
[![Greenkeeper badge](https://badges.greenkeeper.io/martinic/openwhisk-fastspring-classic-gross-pricing-mode.svg)](https://greenkeeper.io/)

An OpenWhisk FastSpring classic gross pricing mode for Contextual Stores. FastSpring Exchange Rates are coming from the OANDA Exchange Rates API on a daily basis. So scheduling this once a day is good enough.

## Prerequisites
- OpenWhisk command line interface (CLI) called `wsk`
- npm install -g bestzip

## Installation
- npm install
- npm run create
- npm run update (Only for development)
- npm run invoke

## config

json input (`params.json`)
```
{
  "credentials": {
    "username": "API_credentials_username",
    "password": "API_credentials_password",
  },
  "settings":{
    "price_decoration": false
  }
}
```
