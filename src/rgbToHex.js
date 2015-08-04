'use strict';

/**
 * Converts an RGB color to Hexademical.
 * returns s tring with a #preceding
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HEX representation
 */
var rgbToHex = function(r, g, b){
  r = ("0" + parseInt(r).toString(16)).slice(-2),
  g = ("0" + parseInt(g).toString(16)).slice(-2),
  b = ("0" + parseInt(b).toString(16)).slice(-2);

  return "#" + r + g + b;
}

module.exports = rgbToHex;