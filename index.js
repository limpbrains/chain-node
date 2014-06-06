var request = require('request');
var fs = require("fs");
var path = require("path");

var URL = "https://api.chain.com";
var PEM = fs.readFileSync(path.join(__dirname, "./chain.pem"));

module.exports = {
  getKey: function() {
    return this.key || 'GUEST-TOKEN';
  },
  getAddress: function(addr, cb) {
    console.log(this.getKey());
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/addresses/' + addr,
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },

  sendTransaction: function(txnHex, cb) {
    request({
      method: 'PUT',
      uri: URL + '/v1/bitcoin/transactions/',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
      json: {hex: txnHex},
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },

  getUnspentOutputs: function(addr, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/addresses/' + addr + '/unspents',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  }
};
