var palette = require('../main/palette');

describe('palette', function suite() {
  var red   = [255, 0, 0],
      green = [0, 255, 0],
      blue  = [0, 0, 255],
      white = [255, 255, 255],
      black = [0, 0, 0],
      colors,
      fixture;

  beforeEach(function() {
    colors = [red.slice(), green.slice(), blue.slice()];
    fixture = palette.create(colors);
  });

  it('should expose the underlying color array', function test() {
    expect(fixture.colors).toEqual(colors);
  });

  it('should expose the size of underlying color array', function test() {
    expect(fixture.size).toEqual(colors.length);
  });

  it('should shift the underlying color array by a given amount', function test() {
    //fixture.shiftColors(1);
    //expect(fixture.colors).toEqual([blue, red, green]);
    //fixture.shiftColors(2);
    //expect(fixture.colors).toEqual([red, green, blue]);
  });

  it('should fade one color to another color by a given percentage', function test() {
    var idealValue = Math.floor(255 / 2),
        idealResult = [idealValue, idealValue, idealValue],
        actualResult = fixture.fadeColor(white, black, 50);
    expect(actualResult).toEqual(idealResult);
  });

  /*
  it('should blend colors in the underlying color array by a given percentage', function test() {
    fixture.blendColors(5);
    expect(fixture.colors[0][0] < red[0]).toBeTruthy();
    expect(fixture.colors[0][1] < green[1]).toBeTruthy();
    expect(fixture.colors[0][1] > red[1]).toBeTruthy();
    expect(fixture.colors[0][0] > green[0]).toBeTruthy();
  });
  */

  it('should cycle colors in the palette', function test() {
    //console.log(fixture.colors);
    fixture.cycle(1, 10);
    //console.log(fixture.colors);
    fixture.cycle(1, 10);
    //console.log(fixture.colors);
    fixture.cycle(1, 0);
    //console.log(fixture.colors);
  });

  it('should generate a complete rgb palette', function test() {
    var rgb = palette.palettes.rgb;
    expect(rgb.size).toEqual(256);
  });
});
