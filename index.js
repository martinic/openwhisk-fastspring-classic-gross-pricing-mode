const fetch = require("node-fetch");

async function main(params) {
  let auth = 'Basic ' + new Buffer(params.credentials.username + ':' + params.credentials.password).toString('base64');
  let apiUrl = 'https://api.fastspring.com';

  let authHheaders = {
    "Content-Type": "application/json",
    "Authorization": auth
  }

  let headers = {
    "Content-Type": "application/json"
  }

  try {
    const response1 = await fetch('https://api.exchangeratesapi.io/latest?base=USD', {method:'GET', headers: headers });
    const json1 = await response1.json();
    console.log(json1);
    const response2 = await fetch(apiUrl + '/products/scanner-vibrato', {method:'GET', headers: authHheaders });
    const json2 = await response2.json();
    console.log(json2);
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
