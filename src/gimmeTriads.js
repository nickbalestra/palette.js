'use strict';

/**
 * TODO
 *
 * @return  Array           The generated colors
 */
var gimmeTriads = function(){

  var triads = [];

  for ( var i = 1; i < 3; i++ ) {
    var hue = this.baseColor.hsv['H'];
    hue = ( hue + ( 120 * i ) ) % 360;

    var saturation = this.baseColor.hsv['S'];
    var value = this.baseColor.hsv['V'];

    var RGB = this.hsvToRgb(hue, saturation, value);
    var HEX = this.rgbToHex(RGB[0], RGB[1], RGB[2]);
    this.triads.push( [new Palette(HEX)] );
    triads.push(HEX);
  }

  // triads.unshift(this.baseColor.hex);
  return triads;
};

module.exports = gimmeTriads;