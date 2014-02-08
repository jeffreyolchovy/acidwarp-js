var window = window || {};
window.requestAnimFrame = (function() {
  var fallback = function(callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };

  return (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    fallback
  );
})();

exports.eventLoop = function(f, fps){
  var previous, initial = +(new Date());

  return (function loop(current){
    requestAnimationFrame(loop);

    var now = +(new Date()),
        elapsed = now - initial,
        interval = 1000 / (this.fps || fps || 60);

    if (elapsed > interval) {
      previous = current;
      initial = now - (elapsed % interval);
      n = 1000 / (current - previous);
      return f(n);
    }
  })(0);
};

exports.shuffle = function(array) {
  var i = array.length, j, tmp;

  while (i !== 0) {
    j = Math.floor(Math.random() * i--);
    tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  return array;
};
