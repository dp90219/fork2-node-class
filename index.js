module.exports = function(child, ParentFunc) {
  var ChildFunc = child.initialize || function() {};

  ParentFunc = ParentFunc || Object;

  // ChildFunc.prototype.constructor.prototype = ParentFunc.prototype;

  for (var key in ParentFunc.prototype) {
    ChildFunc.prototype[key] = ParentFunc.prototype[key];
  }

  ChildFunc.__super__ = ParentFunc;

  for (var key in child)
    if (key != "initialize" && child.hasOwnProperty(key))
      ChildFunc.prototype[key] = child[key];


  return ChildFunc;
}
