'use strict';

/**
 * Decorate the base color by adding all RGB, HSV, and HSL formats
 * to the initial Hexadecimila color
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes R, G, and B are contained in the set [0, 255] and
 * returns H, S, and V in the set [0, 1].
 *
 * @param   Number  R       The red color value
 * @param   Number  G       The green color value
 * @param   Number  B       The blue color value
 * @return  Array           The HSV representation
 */
var formatBase = function(colorHex){
  var formats = {};

  formats.hex = colorHex;

  var rgb = this.hexToRgb(colorHex);
  var R = rgb[0];
  var G = rgb[1];
  var B = rgb[2];
  formats.rgb = {
    R: R,
    G: G,
    B: B
  };

  var hsv = this.rgbToHsv(R, G, B);
  formats.hsv = {
    H: hsv[0],
    S: hsv[1],
    V: hsv[2]
  };

  return formats;
}

module.exports = formatBase;