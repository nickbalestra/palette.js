(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Palette = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var Palette = function(baseColor){
  this.baseColor = this.formatBase( baseColor || this.randomBase() );
  this.monochroms = [];
  this.analogous = [];
  this.tetrads = [];
  this.triads = [];
  this.hues = [];
}

Palette.prototype.hexToRgb = require('./src/hexToRgb');
Palette.prototype.rgbToHex = require('./src/rgbToHex');
Palette.prototype.hsvToRgb = require('./src/hsvToRgb');
Palette.prototype.rgbToHsv = require('./src/rgbToHsv');
Palette.prototype.formatBase = require('./src/formatBase');
Palette.prototype.randomBase = require('./src/randomBase');

Palette.prototype.gimmeHues = require('./src/gimmeHues');
Palette.prototype.gimmeAnalogous = require('./src/gimmeAnalogous');
Palette.prototype.gimmeTriads = require('./src/gimmeTriads');


// TODO
// Palette.prototype.gimmeSplitComplements = function(){};
// Palette.prototype.gimmeMonochroms = function(){};
// Palette.prototype.gimmeTetrads = function(){};

module.exports = Palette;
},{"./src/formatBase":2,"./src/gimmeAnalogous":3,"./src/gimmeHues":4,"./src/gimmeTriads":5,"./src/hexToRgb":6,"./src/hsvToRgb":7,"./src/randomBase":8,"./src/rgbToHex":9,"./src/rgbToHsv":10}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
'use strict';

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
var hsvToRgb = function(h, s, v){
  var r, g, b;
  var i, f, p, q, t;

  if( s === 0 ){
    return {
      r: v,
      g: v,
      b: v
    };
  }

  h /= 60;
  i = Math.floor( h );
  f = h - i;
  p = v * ( 1 - s );
  q = v * ( 1 - s * f );
  t = v * ( 1 - s * ( 1 - f ) );

  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [Math.ceil(r * 255), Math.ceil(g * 255), Math.ceil(b * 255)];
}

module.exports = hsvToRgb;
},{}],8:[function(require,module,exports){
'use strict';

/**
 * TODO
 *
 * @param   Number  num     The number of analogous to generate
 * @return  String          The generated color in Hexadecimal format
 */
var randomBase = function(){
  return '#00FFFF';
};

module.exports = randomBase;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}]},{},[1])(1)
});