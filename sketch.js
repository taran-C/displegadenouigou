const borderx = 20
const bordery = 20

const xmin = -2, xmax = 2
const ymin = -3, ymax = 3

// var slider1, slider2, slider3;
var holding = -1
var xs = [-1,0,1]

//Converts function space coordinates to draw space coordinates
function ftd(fx, fy) { 
  dx = (fx-xmin)/(xmax-xmin)*(width - 2*borderx) + borderx
  dy = height - bordery - (fy-ymin)/(ymax-ymin)*(height - 2*bordery)
  return [dx, dy]
}

//The opposite
function dtf(dx,dy) {
  fx = (dx-borderx)*(xmax-xmin)/(width - 2*borderx) + xmin
  fy = ymin + (height-dy-bordery)*(ymax-ymin)/(height - 2*bordery)
  return [fx, fy]
}

function draw_axes() {
  c = 100 //Draw color
  stroke(c)
  fill(c)

  sw = 4 //
  strokeWeight(sw)

  //X axis
  line(bordery,height-borderx,width-bordery,height-borderx) 
  triangle(width-bordery, height-borderx, width-bordery-2*sw, height-borderx-sw, width-bordery-2*sw, height-borderx+sw)

  //Y axis
  line(bordery,height-borderx,bordery,borderx) 
  triangle(bordery,borderx,bordery-sw,borderx+2*sw,bordery+sw,borderx+2*sw)


  strokeWeight(1)
  text(str(xmin), bordery, height - borderx + 3*sw)
  text(str(xmax), width-bordery, height - borderx + 3*sw)


  text(str(ymin), bordery -4*sw, height - borderx)
  text(str(ymax), bordery -4*sw, borderx + 3*sw)
}

function plot(x, y, color = 0) {
  strokeWeight(2)
  stroke(color)
  fill(color)
  
  n = x.length
  if (n != y.length) {
    return
  }
  for (i = 0; i<n-1; i++) {
    p1 = ftd(x[i], y[i])
    p2 = ftd(x[i+1], y[i+1])
    line(p1[0], p1[1], p2[0], p2[1])
  }
}

function linspace(start, stop, n) {
  var arr = [];
  var step = (stop - start) / (n - 1);
  for (var i = 0; i < n; i++) {
    arr.push(start + (step * i));
  }
  return arr;
}

function setup() {
  var canvasDiv = document.getElementById('plot');
  width = canvasDiv.offsetWidth;
  height = 400
  var canvas = createCanvas(width, height);
  canvas.parent('plot')

  // slider1 = createSlider(0,100)
  // slider1.position(canvas.position().x + 50,canvas.position().y + 50)
  // slider1.size(160)
}

function print_mouse_coords() {
  cs = dtf(mouseX,mouseY)
  strokeWeight(1)
  text(str(cs[0]), 50, 50)
  text(str(cs[1]), 50, 70)
}

class Polynomial {
  //(X = coeffs[0] + coeffs[1]x + ...)
  //TODO fix null coefficients at end
  constructor(coeffs, r = false) {
    if (!r) {
      this.coeffs = coeffs;
    } else {

    }
  }

  deg() {
    return this.coeffs.length-1
  }

  eval(x) {
    var r = 0;
    for (var i = 0; i<this.coeffs.length; i++) {
      r += x**i * this.coeffs[i];
    }
    return r
  }

  times(p) {
    var cs = Array(this.deg() + p.deg() + 1).fill(0);
    
    for (var i = 0; i<=this.deg(); i++) {
      for (var j = 0; j<=p.deg(); j++) {
        cs[i+j] += this.coeffs[i] * p.coeffs[j] 
      } 
    }

    return new Polynomial(cs)
  }

}

function lag_pols(xs) {
  var n = xs.length;
  var ps = [];

  for (var i = 0; i<n; i++) {
    p = new Polynomial([1]);
    for (var j = 0; j<n; j++) {
      if (i!=j) {
        p = p.times(new Polynomial([(-xs[j])/(xs[i]-xs[j]), 1/(xs[i]-xs[j])]));
      }
    }
    ps.push(p);
  }
  return ps;
}

function draw() {
  background(240);

  draw_axes()

  // xs = [-1,(slider1.value()/100)*(xmax-xmin)+xmin,1];

  var x = linspace(xmin,xmax,100)
  var ps = lag_pols(xs)
  var y = []
  
  for (var i = 0; i<x.length; i++) {
    y.push(ps[0].eval(x[i]))
  }

  plot(x,y, color = "red")
  var fc = ftd(xs[0], 1)
  circle(fc[0], fc[1], 12)
  y = []

  for (var i = 0; i<x.length; i++) {
    y.push(ps[1].eval(x[i]))
  }

  plot(x,y, color = "blue")
  var fc = ftd(xs[1], 1)
  circle(fc[0], fc[1], 12)
  y = []

  for (var i = 0; i<x.length; i++) {
    y.push(ps[2].eval(x[i]))
  }

  plot(x,y, color = "green")
  var fc = ftd(xs[2], 1)
  circle(fc[0], fc[1], 12)

  //Test plot
  // y = []
  // for (var i = 0; i<x.length; i++) {
  //   y.push(2*ps[0].eval(x[i]) + 1*ps[1].eval(x[i]) - 2*ps[2].eval(x[i]))
  // }
  // plot(x,y, color = "gray")

  // plot([xmin, xmax], [0,0], color="black")
  // plot([xmin, xmax], [1,1], color="black")

  // dx = dtf(mouseX, 0)[0]
  // fy = ftd(0, ps[0].eval(dx))[1]

  // circle(mouseX, fy, 5)
}

//TODO optimize
function mousePressed(event) {
  if(event.button == 0) {
    var c0 = ftd(xs[0], 1)
    var c1 = ftd(xs[1], 1)
    var c2 = ftd(xs[2], 1)
    if (sqrt((mouseX - c0[0])**2 + (mouseY - c0[1])**2)<12) {
      holding = 0
    } else if (sqrt((mouseX - c1[0])**2 + (mouseY - c1[1])**2)<12) {
      holding = 1
    } else if (sqrt((mouseX - c2[0])**2 + (mouseY - c2[1])**2)<12) {
      holding = 2
    }
  }
}

function mouseDragged() {
  if (holding != -1) {
    var c = dtf(mouseX, 0)
    xs[holding] = c[0]
  }
}

function mouseReleased() {
  holding = -1
}
