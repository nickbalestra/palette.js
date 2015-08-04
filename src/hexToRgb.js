'use strict';

/**
 * Converts an Hexademical color to RGB.
 * Assumes hex is a an hexadecimal of length 6 or 3
 * and comes in a string format with a #preceding
 * returns r, g, and b in the set [0, 255].
 *
 * @param   String  hex     The Hexadecimal color calue
 * @return  Array           The HSL representation
 */
var hexToRgb = function(hex){
  var rgb = [];
  hex = (String(hex)).replace(/#/, '');

  if (hex.length == 3) {
    hex += hex;
  }

  for (var i = 0; i < 6; i += 2) {
    rgb.push(parseInt(hex.substr(i,2),16));
  }

  return rgb;
}

module.exports = hexToRgb;