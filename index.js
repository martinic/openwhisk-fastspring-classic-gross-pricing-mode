function main(params) {
  return new Promise(function(resolve, reject) {
    resolve({ done: true });
  });
}

exports.main = main;

if (require.main === module) {
  var fs = require("fs");
  var contents = fs.readFileSync("params.json");
  var params = JSON.parse(contents);
  console.log(main(params));
}
