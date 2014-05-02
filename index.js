var Class = function(child, Parent) {
  // this.constructor = child.initialize || function() {};
  // this.constructor = function(){};

  if (Parent)
     // this.constructor.prototype.constructor.prototype = parent.prototype;
     this.constructor.prototype = new Parent();

  for (var key in child) {
    if (key != 'initialize' && typeof child[key] == 'function')
      this.constructor.prototype[key] = child[key];
  }

  return this.constructor;
}

module.exports = Class;


