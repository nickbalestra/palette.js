var expect = require('../node_modules/chai/chai').expect;
var Palette = require('../dist/palette.js');

describe('Palette.js', function() {
  var palette;

  beforeEach(function() {
    palette = new Palette('#80b3ff');
  });

  it('should have a property named "baseColor", "triads", "tetrads", "analogous", "monochroms" "hues"', function() {
    expect(palette.hasOwnProperty("baseColor")).to.equal(true);
    expect(palette.baseColor).to.be.a("object");

    expect(palette.hasOwnProperty("triads")).to.equal(true);
    expect(palette.triads).to.be.a("array");

    expect(palette.hasOwnProperty("tetrads")).to.equal(true);
    expect(palette.tetrads).to.be.a("array");

    expect(palette.hasOwnProperty("analogous")).to.equal(true);
    expect(palette.analogous).to.be.a("array");

    expect(palette.hasOwnProperty("monochroms")).to.equal(true);
    expect(palette.monochroms).to.be.a("array");

    expect(palette.hasOwnProperty("hues")).to.equal(true);
    expect(palette.hues).to.be.a("array");
  });

  it('should have a "baseColor" in various formats', function() {
    expect(palette.baseColor.hex).to.be.a("string");
    expect(palette.baseColor.hex).to.equal('#80b3ff');

    expect(palette.baseColor.hsv).to.be.a("object");
    expect(palette.baseColor.hsv['H']).to.equal(216);
    expect(palette.baseColor.hsv['S']).to.equal(0.5);
    expect(palette.baseColor.hsv['V']).to.equal(1);

    expect(palette.baseColor.rgb).to.be.a("object");
    expect(palette.baseColor.rgb['R']).to.equal(128);
    expect(palette.baseColor.rgb['G']).to.equal(179);
    expect(palette.baseColor.rgb['B']).to.equal(255);
  });

  it('should have a method named "formatBase" and "randomBase"', function() {
    expect(palette.formatBase).to.be.a("function");
    expect(palette.randomBase).to.be.a("function");
  });

  it('should have a method named "gimmeTriads", "gimmeAnalogous" and "gimmeHues"', function() {
    expect(palette.gimmeTriads).to.be.a("function");
    expect(palette.gimmeAnalogous).to.be.a("function");
    expect(palette.gimmeHues).to.be.a("function");
  });

  xit('should have a method named "gimmeTetrads", "gimmeSplitComplements" and "gimmeMonochroms"', function() {
    expect(palette.gimmeTetrads).to.be.a("function");
    expect(palette.gimmeSplitComplements).to.be.a("function");
    expect(palette.gimmeMonochroms).to.be.a("function");
  });

  it('should have a method named "rgbToHsv", "hsvToRgb", "hexToRgb" and "rgbToHex"', function() {
    expect(palette.rgbToHsv).to.be.a("function");
    expect(palette.hsvToRgb).to.be.a("function");
    expect(palette.hexToRgb).to.be.a("function");
    expect(palette.rgbToHex).to.be.a("function");
  });


  it('should convert rgb colors to hsv', function() {
    expect(palette.rgbToHsv(255, 128, 128)).to.eql([0, 0.5, 1]);
  });

  // it('should convert rgb colors to hsl', function() {
  //   expect(palette.rgbToHsl(255, 128, 128)).to.eql([0, 100, 75]);
  // });

  it('should convert hex colors to rgb', function() {
    expect(palette.hexToRgb('#ff8080')).to.eql([255, 128, 128]);
  });

  it('should convert hsv colors to rgb', function() {
    expect(palette.hsvToRgb(0, 0.5, 1)).to.eql([255, 128, 128]);
  });





});
