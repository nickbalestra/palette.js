'use strict';

/**
 * TODO
 *
 * @param   Number  num     The number of analogous to generate
 * @return  Array           The generated colors
 */
var gimmeAnalogous = function(num){
  num = num || 5;
  var analogous = [];
  var hue;
  var saturation;
  var value;

  for ( var i = 1; i <= num; i++ ) {

    if (this.analogous.length === 0) {
      hue = this.baseColor.hsv['H'];
      saturation = this.baseColor.hsv['S'];
      value = this.baseColor.hsv['V'];
    } else {
      hue = this.analogous[this.analogous.length - 1]['baseColor']['hsv']['H'];
      saturation = this.analogous[this.analogous.length - 1]['baseColor']['hsv']['S'];
      value = this.analogous[this.analogous.length - 1]['baseColor']['hsv']['V'];
    }
    hue = ( hue + ( 20 * i ) ) % 360;

    var RGB = this.hsvToRgb(hue, saturation, value);
    var HEX = this.rgbToHex(RGB[0], RGB[1], RGB[2]);

    var exist = false;

    this.analogous.forEach(function(color){
      if (color['baseColor']['hex'] === HEX) {
        exist = true;
      }
    })
    if (!exist) {
      this.analogous.push( new Palette(HEX) );
      analogous.push(HEX);
    }
  }
  return analogous;
};

module.exports = gimmeAnalogous;