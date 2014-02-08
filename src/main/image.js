var maths = require('./maths');

var generateImage = function(width, height, f) {
  var center = [width / 2, height / 2];
  var data = [];
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var dx = x - center[0];
      var dy = y - center[1];
      var dist = maths.distance(dx, dy);
      var angle = maths.angle(dx, dy);
      var paletteIndex = f({x: x, y: y, dx: dx, dy: dy, dist: dist, angle: angle}); 
      data[y * width + x] = Math.abs(paletteIndex % 256);
    }
  }
  return data;
};

exports.generateImages = function(width, height) {
  return [
    generateImage(width, height, function(ctx) {
      return Math.floor(ctx.angle + maths.sin(ctx.dist * 8) / 32);
    }),
    generateImage(width, height, function(ctx) {
      return Math.floor(
        (maths.cos((ctx.x * maths.ANGLE_UNIT) / width) / 8) +
        (maths.cos((ctx.y * maths.ANGLE_UNIT) / height) / 8) +
        (maths.sin(ctx.dist) / 32) + ctx.angle);
    }),
    generateImage(width, height, function(ctx) {
      return Math.floor(
        (maths.sin(maths.distance(ctx.dx, ctx.dy - 20) * 12) / 32) +
        (maths.sin(maths.distance(ctx.dx + 20, ctx.dy + 20) * 12) / 32) +
        (maths.sin(maths.distance(ctx.dx - 20, ctx.dy + 20) * 12) / 32));
    })
  ];
};
