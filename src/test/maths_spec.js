var maths = require('../main/maths');

describe('angle', function suite() {
  it('should perform computation without error', function test() {
    var x = 0, y = 0;
    var result = maths.angle(x, y);
    expect(result).toEqual(0);
  });

  it('should perform computation without error', function test() {
    var x = 1, y = 2;
    var result = maths.angle(x, y);
    expect(result).not.toEqual(NaN);
  });
});

describe('distance', function suite() {
  it('should return y if x is 0', function test() {
    var x = 0, y = 1;
    var result = maths.distance(x, y);
    expect(result).toEqual(y);
  });

  it('should return x if y is 0', function test() {
    var x = 1, y = 0;
    var result = maths.distance(x, y);
    expect(result).toEqual(x);
  });

  it('should provide a reliable measure of distance', function test() {
    var x = 10, y = 20;
    var result = maths.distance(x, y);
    var actual = Math.sqrt(x * x + y * y);
    var diff = Math.abs(result - actual);
    expect(diff <= 5).toBe(true);
  });
});
