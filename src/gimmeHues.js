'use strict';

/**
 * It randomly picks hues that are not between 50° and 70° or 340° and 360°
 * It checks if the difference between the previous and the next hue is
 * between 30° and 160° or 200° and 330°
 * it adjusts the saturation and the brightness according to the listed values (see below)
 *
 * @param   Number  nHues   The number of hues to generate
 * @return  Array           The generated colors
 */
var gimmeHues = function(nHues){
  nHues = nHues || 5;
  var context = this;
  var hue = this.baseColor.hsv['H'];
  var hues = [];

  for(var i = 0; i < nHues; i++) {
    var previousHue = hue;

    do {
      hue = (previousHue + (Math.random() * 4294967296 % 101 + 60)) % 360;
    } while ( (hue > 50 && hue < 70) || (hue > 340 && hue < 360) );

    if (hue !== previousHue) {
      hues.push(hue);
    }
  }


  hues = hues.map(function(hue){
    var saturation = 70;
    var value = 60;

    if (hue >= 0 && hue < 20) {
      saturation = 70;
      value = 85;
    }
    if (hue >= 20 && hue < 50) {
      saturation = 80;
      value = 85;
    }
    if (hue >= 70 && hue < 220) {
      saturation = 65;
      value = 70;
    }
    if (hue >= 200 && hue < 220) {
      saturation = 65;
      value = 80;
    }
    if (hue >= 220 && hue < 280) {
      saturation = 60;
      value = 90;
    }
    if (hue >= 280 && hue < 320) {
      saturation = 60;
      value = 85;
    }
    if (hue >= 320 && hue < 340) {
      saturation = 70;
      value = 85;
    }

    var RGB = context.hsvToRgb(hue, saturation, value);
    var HEX = context.rgbToHex(RGB[0], RGB[1], RGB[2]);
    return HEX;
  });

  hues.forEach(function(hex){
    context.hues.push(new Palette(hex));
  })
  return hues;
};

module.exports = gimmeHues;