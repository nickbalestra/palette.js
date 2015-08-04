'use strict';

/**
 * Converts an RGB color to HSV. Conversion algo
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and n are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
var rgbToHsv = function(r, g, b){
  r /=255;
  g /= 255;
  b /= 255;
  var computed_H = 0;
  var computed_S = 0;
  var computed_V = 0;
  var min_RGB = Math.min( r, Math.min( g, b ) );
  var max_RGB = Math.max( r, Math.max( g, b ) );

  // Black-gray-white
  if ( min_RGB === max_RGB ) {
    computed_V = min_RGB;
    return {
      h: 0,
      s: 0,
      v: computed_V
    };
  }

  // Colors other than black-gray-white:
  var d = ( r === min_RGB ) ? g - b : (( b === min_RGB ) ? r - g : b - r);
  var h = ( r === min_RGB ) ? 3 : (( b === min_RGB ) ? 1 : 5);
  computed_H = Math.round( 60 * ( h - d / ( max_RGB - min_RGB )));
  computed_S = Math.round( (( max_RGB - min_RGB ) / max_RGB) * 10) / 10;
  computed_V = Math.round(max_RGB * 10) / 10;

  return [computed_H, computed_S, computed_V];
}

module.exports = rgbToHsv;