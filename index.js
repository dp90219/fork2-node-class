var Class = function(args) {
  this.constructor = args.initialize || function() {};

  for(var i in args) {
    if (args[i].hasOwnProperty && typeof args[i] == 'function' && i != 'initialize') {
      this.constructor.prototype[i] = args[i];
    }
  }

  return this.constructor;
}

module.exports = Class;


