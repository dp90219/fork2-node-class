var Class = function(args) {
  this.constructor = args.initialize || function() {};
  return this.constructor;
}

module.exports = Class;


