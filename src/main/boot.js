var maths   = require('./maths'),
    utils   = require('./utils'),
    image   = require('./image'),
    palette = require('./palette');

var WIDTH   = 512,
    HEIGHT  = 512,
    CENTER  = [WIDTH / 2, HEIGHT / 2],
    COLORS  = 256;

var init = function() {
  var canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  context = canvas.getContext('2d');
  document.body.appendChild(canvas);

  var images = image.generateImages(WIDTH, HEIGHT);
      currentImage = images[window.location.hash ? window.location.hash.substring(1) : 0],
      currentPalette = palette.palettes.rgb,
      startTime = +(new Date());

  utils.eventLoop(function() {
    return draw(context, currentImage, currentPalette, +(new Date()) - startTime);
  }, 16);
};

var draw = function(context, image, palette, timeElapsed) {
  console.time('draw');
  var imageData = context.getImageData(0, 0, WIDTH, HEIGHT);
  var buf = new ArrayBuffer(imageData.data.length);
  var buf8 = new Uint8ClampedArray(buf);
  var buf32 = new Uint32Array(buf);
  image.forEach(function(elem, i) {
    var rgb = palette.colors[elem];
    buf32[i] = (255 << 24) | (rgb[2] << 16) | (rgb[1] << 8) | rgb[0];
  });
  imageData.data.set(buf8);
  context.putImageData(imageData, 0, 0);
  palette.cycle(1);
  console.timeEnd('draw');
  return timeElapsed <= (1000 * 10);
};

exports.main = function() {
  console.log('Booting..');
  window.onload = init;
};
