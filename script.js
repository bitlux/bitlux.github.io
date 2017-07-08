var lightbox_active = false;

getIndex = function() {
  var i_elem = document.getElementById("the_img");
  var cur_img = i_elem.src.match(/(\d+)\.png/)[1];
  return images.indexOf(cur_img);
}

prefetch = function() {
  var pf = new Image();
  var pf_img = images[(getIndex() + 1 + images.length) % images.length];
  var i_elem = document.getElementById("the_img");
  var cur_img = i_elem.src.match(/(\d+)\.png/)[1];
  pf.src = i_elem.src.replace(cur_img, pf_img);
}

show = function(img, dir) {
  if (dir == undefined) {
    dir = 'photos/'
  }
  var i_elem = document.getElementById("the_img");
  i_elem.src = dir + img + ".png";
  i_elem.style.maxHeight = "" + 0.9 * window.innerHeight + "px";
  document.getElementById("blackbox").style.display = "block";
  location.hash = img;
  lightbox_active = true;
  prefetch();
};

hide = function() {
  document.getElementById("blackbox").style.display = "none";
  location.hash = '/';
  lightbox_active = false;
};

swapPhoto = function(offset) {
  var i_elem = document.getElementById("the_img");
  var cur_img = i_elem.src.match(/(\d+)\.png/)[1];
  var index = getIndex();
  var new_img = images[(index + offset + images.length) % images.length];
  i_elem.src = i_elem.src.replace(cur_img, new_img);
  location.hash = new_img;
  prefetch();
}

keyPress = function(event) {
  if (!lightbox_active) {
    return;
  }
  var keynum = -1;
  if (window.event) {
    keynum = event.keyCode;
  }
  else if (event.which) {
    keynum = event.which
  }
  switch (keynum) {
  case 27:
    hide();
    break;
  case 37:
    swapPhoto(-1);
    break;
  case 39:
    swapPhoto(1);
    break;
  }
};

addChar = function(char) {
  document.write("&#" + char + ";");
};

