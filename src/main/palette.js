function Palette(colors) {
  this.colors = colors;
  this.size = colors.length;
  this.precision = 100,
  this.fade = function(a, b, n) {
    return Math.floor(a + (((b - a) * n) / this.precision));
  };
}

Palette.prototype.fadeColor = function(src, dest, n) {
  if (n < 0) n = 0;
  if (n > this.precision) n = this.precision;
  return [
    this.fade(src[0], dest[0], n),
    this.fade(src[1], dest[1], n),
    this.fade(src[2], dest[2], n)
  ];
};

Palette.prototype.shiftColor = function() {
  var i = this.size - 1, tmp = this.colors[i];
  while (i > 0) this.colors[i] = this.colors[--i];
  this.colors[0] = tmp;
};

/*
Palette.prototype.shiftColor = function() {
  var index = arguments[0] || 0;
  var direction = arguments[1] || 1, i, tmp;

  // shift forwards
  if (direction > 0) {
    i = 0, tmp = this.colors[i][index];
    while (i < this.size - 1) this.colors[i][index] = this.colors[++i][index];
    this.colors[this.size - 1][index] = tmp;
  }
  // shift backwards
  else {
    i = this.size - 1, tmp = this.colors[i][index];
    while (i > 0) this.colors[i][index] = this.colors[--i][index];
    this.colors[0][index] = tmp;
  }
};
*/

Palette.prototype.shiftColors = function(n, i) {
  while (n-- > 0) this.shiftColor(i);
};

// this will eventually move all colors in palette to dark gray
// todo: replace with fadeToBlack
Palette.prototype.blend = function(n) {
  var i = 0, tmp = this.colors[i];
  for (; i < this.size - 1; i++) this.colors[i] = this.fadeColor(this.colors[i], this.colors[i + 1], n);
  this.colors[i] = this.fadeColor(this.colors[i], tmp, n);
};

// this will eventually move all colors in palette to light gray
// todo: replace with fadeToWhite
Palette.prototype.lighten = function(n) {
  for (var i = 0, target = [255, 255, 255]; i < this.size; i++)
    this.colors[i] = this.fadeColor(this.colors[i], target, n);
};

Palette.prototype.cycle = function(/*n*/) {
  this.shiftColors(arguments[0] || 1, arguments[2] || 0);
};

var rgb = function() {
  var i, j, colors = [];

  for (i = 0; i < 32; i++) {
    j = i;
    colors[j] = [];
    colors[j][0] = i * 2;
    colors[j][1] = 0;
    colors[j][2] = 0;

    j += 64;
    colors[j] = [];
    colors[j][0] = 0;
    colors[j][1] = i * 2;
    colors[j][2] = 0;

    j += 64;
    colors[j] = [];
    colors[j][0] = 0;
    colors[j][1] = 0;
    colors[j][2] = i * 2;

    j += 64;
    colors[j] = [];
    colors[j][0] = i * 2;
    colors[j][1] = i * 2;
    colors[j][2] = i * 2;
  }

  for (i = 0; i < 64; i++) {
    j = i;
    colors[j] = [];
    colors[j][0] = (64 - i) * 2;
    colors[j][1] = 0;
    colors[j][2] = 0;

    j += 64;
    colors[j] = [];
    colors[j][0] = 0;
    colors[j][1] = (64 - i) * 2;
    colors[j][2] = 0;

    j += 64;
    colors[j] = [];
    colors[j][0] = 0;
    colors[j][1] = 0;
    colors[j][2] = (64 - i) * 2;

    j += 64;
    colors[j] = [];
    colors[j][0] = (64 - i) * 2;
    colors[j][1] = (64 - i) * 2;
    colors[j][2] = (64 - i) * 2;
  }

  return new Palette(colors);
};

exports.create = function(colors) {
  return new Palette(colors);
};

exports.palettes = {
  rgb: rgb()
};
