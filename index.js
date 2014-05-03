module.exports = function(child, ParentFunc) {
  var ChildFunc = child.initialize || function() {};

  ParentFunc = ParentFunc || Object;
  
  // if ParentFunc `hasOwnProperty` is true, it would miss it when to use `ParentFunc.prototype`, 
  // so I use `new' to produce a `clsss`
  var parent = new ParentFunc();
  for (var key in parent) {
    //ChildFunc.prototype[key] = ParentFunc.prototype[key];
    ChildFunc.prototype[key] = parent[key];
  }

  ChildFunc.__super__ = ParentFunc;

  //override or not
  var _super = parent;
  for (var name in child) {
    if (name != "initialize") {
      ChildFunc.prototype[name] = typeof child[name] == "function" && typeof parent[name] == "function" ?
        (function(name, fn) {
          return function() {
            var tmp = this._super;
            this._super = _super[name];
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, child[name]) :
        child[name];
    }
  }

  var current_class = ChildFunc;
  ChildFunc.prototype.super = function(name) {
    var temp = current_class;
    current_class = current_class.__super__;
    // the reason why use `new` is the same as the 6th line.
    // var result = current_class.prototype.apply(this, [].slice.call(arguments, 1));
    var curClass = new current_class();
    var result = curClass[name].apply(this, [].slice.call(arguments, 1));

    current_class = temp;
    return result;
  };


  return ChildFunc;
}
