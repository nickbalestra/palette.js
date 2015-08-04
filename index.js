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