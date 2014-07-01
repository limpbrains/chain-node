var request = require('request');
var fs = require("fs");
var path = require("path");

var URL = "https://api.chain.com";
var PEM = fs.readFileSync(path.join(__dirname, "./chain.pem"));

module.exports = {
  getKey: function() {
    return this.key || 'GUEST-TOKEN';
  },
  getAddress: function(address, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/addresses/' + address,
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getAddressTransactions: function(address, options, cb) {
    options = options || {};
    if (typeof(options) == 'function') {
        cb = options;
        options = {};
    }
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/addresses/' + address + '/transactions',
      qs: options,
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getAddressUnspents: function(address, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/addresses/' + address + '/unspents',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getTransaction: function(hash, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/transactions/' + hash,
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getTransactionOpReturn: function(hash, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/transactions/' + hash + '/op-return',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  sendTransaction: function(hex, cb) {
    request({
      method: 'PUT',
      uri: URL + '/v1/bitcoin/transactions',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
      json: {hex: hex},
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },
  getBlock: function(hashOrHeight, cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/blocks/' + hashOrHeight,
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getLatestBlock: function(cb) {
    request({
      method: 'GET',
      uri: URL + '/v1/bitcoin/blocks/latest',
      strictSSL: true,
      cert: PEM,
      auth: {user: this.getKey()},
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  }
};
