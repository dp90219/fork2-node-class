module.exports = function(child) {
  var classFunc = child.initialize || function() {};

  for (var key in child) 
    if (key != "initialize")
      classFunc.prototype[key] = child[key];

  return classFunc;
}
