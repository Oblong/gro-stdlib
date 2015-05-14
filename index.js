
/* (c)  oblong industries */

global.Matches = function(str, pattern) {
  var regexp;
  regexp = new RegExp(pattern);
  return regexp.test(str);
};

global.Match = function(str, pattern) {
  var regex;
  regex = new RegExp(pattern);
  return str.match(regex);
};

global.Range = function(val, val_min, val_max, out_min, out_max) {
  if (val_max < val_min) {
    return 0;
  }
  if (val < val_min) {
    val = val_min;
  }
  if (val > val_max) {
    val = val_max;
  }
  return (val - val_min) / (val_max - val_min) * (out_max - out_min) + out_min;
};

global.stringify = function(obj, prop) {
  var fns, json, placeholder;
  placeholder = '____PLACEHOLDER____';
  fns = [];
  json = JSON.stringify(obj, (function(key, value) {
    if (typeof value === 'function') {
      fns.push(value);
      return placeholder;
    }
    return value;
  }), 2);
  json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
    return fns.shift();
  });
  return 'this["' + prop + '"] = ' + json + ';';
};

