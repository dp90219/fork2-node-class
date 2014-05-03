module.exports = function(child, ParentFunc) {
  var ChildFunc = child.initialize || function() {};

  // ChildFunc.prototype.constructor = ChildFunc;

  ParentFunc = ParentFunc || Object;

  // ChildFunc.prototype = new ParentFunc();

  function ctor() {
    this.constructor = ChildFunc;
  };

  ctor.prototype = ParentFunc.prototype;
  ChildFunc.prototype = new ctor();


  ChildFunc.__super__ = ParentFunc;

  //override or not
  var _super = ParentFunc.prototype;
  for (var name in child) {
    if (name != "initialize") {
      ChildFunc.prototype[name] = typeof child[name] == "function" && typeof _super[name] == "function" ?
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
    var tmp = current_class;
    current_class = current_class.__super__;
    var result = current_class.prototype[name].apply(this, [].slice.call(arguments, 1));
    current_class = tmp;
    return result;
  };


  return ChildFunc;
}
