// keep the last value to calc the diff
var last_ifin = 0;
var last_ifout = 0;
var last_ugmt = 0;

function isNumber(a) {
  return typeof a == 'number' && isFinite(a);
}

var Speed = {

  getSpeed: function(ifin, ifout, ugmt) {

    if (!isNumber(ifin) || !isNumber(ifout)) {
      return handle_error();
    }

    var diff_ugmt  = ugmt - last_ugmt;
    var diff_ifin  = ifin - last_ifin;
    var diff_ifout = ifout - last_ifout;

    if (diff_ugmt == 0) diff_ugmt = 1;  // avoid division by zero

    // set last_variable
    last_ugmt = ugmt;
    last_ifin = ifin;
    last_ifout = ifout;

    // Calc speed
    var speedIn = diff_ifin / diff_ugmt;
    var speedOut = diff_ifout / diff_ugmt;

    return {
      in: speedIn,
      out: speedOut
    };
  }
}

module.exports = Speed;