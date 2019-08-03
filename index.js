const fetch = require("node-fetch");

async function main(params) {
  let auth = 'Basic ' + new Buffer(params.credentials.username + ':' + params.credentials.password).toString('base64');
  let fastspringApi = 'https://api.fastspring.com';
  let exchangeratesApi = 'https://api.exchangeratesapi.io';
  let baseCurrency = params.settings.base_currency ? params.settings.base_currency : 'USD';
  let currencies = params.settings.currencies ? params.settings.currencies : ['USD'];

  let authHheaders = {
    "Content-Type": "application/json",
    "Authorization": auth
  }

  let headers = {
    "Content-Type": "application/json"
  }

  try {
    const response1 = await fetch( exchangeratesApi + '/latest?base=' + baseCurrency, {method:'GET', headers: headers });
    const exchangerates = await response1.json();
    console.log(exchangerates);
    const response2 = await fetch(fastspringApi + '/products/scanner-vibrato', {method:'GET', headers: authHheaders });
    const json2 = await response2.json();
    basePrice = json2.products[0].pricing.price[baseCurrency];
    for (let currency of currencies) {
      console.log(currency, basePrice * exchangerates.rates[currency]);
    }
    console.log(json2);
    console.log(json2.products[0]);
  } catch (error) {
    console.log(error);
  }
}

exports.main = main;

if (require.main === module) {
  var fs = require("fs");
  var contents = fs.readFileSync("params.json");
  var params = JSON.parse(contents);
  console.log(main(params));
}
