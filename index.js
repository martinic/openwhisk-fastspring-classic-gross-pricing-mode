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
    console.log('exchangerates: ', exchangerates);
    const response2 = await fetch(fastspringApi + '/products', {method:'GET', headers: authHheaders });
    const products = await response2.json();

    for (let productId of products.products) {
      console.log('ID: ', productId);
      const response3 = await fetch(fastspringApi + '/products/' + productId, {method:'GET', headers: authHheaders });
      const product = await response3.json();
      basePrice = product.products[0].pricing.price[baseCurrency];

      let productUpdate = {
        "products": [
          {
            "pricing": {
            }
          }
        ]
      };

      Object.assign(productUpdate.products[0].pricing, product.products[0].pricing);
      productUpdate.products[0].product = product.products[0].product;
      productUpdate.products[0].display = product.products[0].display;
      delete productUpdate.products[0].pricing.cancellation;
      delete productUpdate.products[0].pricing.dateLimitsEnabled;
      if (!productUpdate.products[0].pricing.quantityDiscounts) {
        productUpdate.products[0].pricing.quantityDiscounts = {};
      }
      if (!productUpdate.products[0].pricing.quantityDiscounts[productUpdate.products[0].pricing.quantityDefault]) {
        productUpdate.products[0].pricing.quantityDiscounts[productUpdate.products[0].pricing.quantityDefault] = 0;
      }
      for (let currency of currencies) {
        if (exchangerates.rates[currency]) {
          let value =  (basePrice * exchangerates.rates[currency]).toFixed(2);
          if (params.settings.price_decoration) {
            let [roundBase, centsBase] = basePrice.toFixed(2).split(".");
            let [roundValue, centsValue] = value.split(".");
            if (centsValue > centsBase ) {
              roundValue++;
            }
            value = roundValue + '.' + centsBase;
          }
          productUpdate.products[0].pricing.price[currency] = value;
        }
      }

      console.log('products: ', JSON.stringify(productUpdate, null, 2));

      const response4 = await fetch(fastspringApi + '/products/' + productId, {method:'POST', headers: authHheaders, body: JSON.stringify(productUpdate)});
      const result = await response4.json();
      console.log('result: ', result.products[0]);
    }

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
