var request = require('request');
var fs = require("fs");

var URL = "https://api.chain.com";
var PEM = fs.readFileSync("./chain.pem");
var KEY = "GUEST-TOKEN";
var OPT = {
  host: URL,
  strictSSL: true,
  cert: PEM,
  auth: {user: KEY}
};

module.exports = {
  getAddress: function(addr, cb) {
    request({
      method: 'GET',
      uri: OPT.host + '/v1/bitcoin/addresses/' + addr,
      strictSSL: OPT.strictSSL,
      cert: OPT.cert,
      auth: OPT.auth
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },

  sendTransaction: function(txnHex, cb) {
    request({
      method: 'PUT',
      uri: OPT.host + '/v1/bitcoin/transactions/',
      strictSSL: OPT.strictSSL,
      cert: OPT.cert,
      auth: OPT.auth,
      json: {hex: txnHex},
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },

  getUnspentOutputs: function(addr, cb) {
    request({
      method: 'GET',
      uri: OPT.host + '/v1/bitcoin/addresses/' + addr + '/unspents',
      strictSSL: OPT.strictSSL,
      cert: OPT.cert,
      auth: OPT.auth,
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  }
};
