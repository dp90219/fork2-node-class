module.exports = function(child, ParentFunc) {
  var ChildFunc = child.initialize || function() {};

  ParentFunc = ParentFunc || Object;

  // ChildFunc.prototype.constructor.prototype = ParentFunc.prototype;

  // for (var key in ParentFunc.prototype) {
  //   ChildFunc.prototype[key] = ParentFunc.prototype[key];
  // }

  var parent = new ParentFunc();
  for (var key in parent) {
    ChildFunc.prototype[key] = parent[key];
  }

  ChildFunc.__super__ = ParentFunc;

  for (var key in child)
    if (key != "initialize" && child.hasOwnProperty(key))
      ChildFunc.prototype[key] = child[key];

  ChildFunc.prototype.super = function(name) {
    var result = (new ParentFunc())[name].apply(this, [].slice.call(arguments, 1));
    return result;
  };


  return ChildFunc;
}
