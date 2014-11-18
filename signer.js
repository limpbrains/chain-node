module.exports = Sign;

function Sign(blockChain, template, keys) {
  var applySignature = function(to_sign, key){
    var b = new Buffer(to_sign, "hex");
    return key.sign(b).toDER().toString("hex");
  }

  var findKey = function(address) {
    for(var i = 0; i < keys.length; i++) {
      var keyAddr = keys[i].pub.getAddress(blockChain);
      if(address == keyAddr) {
        return keys[i];
      }
    }
  };

  for(var i = 0; i < template.inputs.length; i++) {
    var input = template.inputs[i];
    for(var j = 0; j < input.signatures.length; j++) {
      var signature = input.signatures[j];
      var key = findKey(signature.address);
      if(key == undefined) continue;
      var pub = key.pub.toHex();
      var sig = applySignature(signature.hash_to_sign, key);

      template.inputs[i].signatures[j]['public_key'] = pub;
      template.inputs[i].signatures[j]['signature'] = sig;
    }
  }
  return template;
};
