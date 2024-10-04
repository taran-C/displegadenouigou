//TODO independent window sizes/margins...
let borderx = 20, bordery = 20
let xmin = -2, xmax = 2
let ymin = -3, ymax = 3
let width = 10, height = 10

let lagrange_polys = new p5(( sketch ) => {
  var holding = -1
  var xs = [-1,0,1]

  sketch.setup = function() {
    var canvasDiv = document.getElementById('lagrange_polys');
    width = canvasDiv.offsetWidth;
    height = 400
    var canvas = sketch.createCanvas(width, height);
    canvas.parent('lagrange_polys')
  }


  

  sketch.draw = function() {
    sketch.background(240);
    draw_axes(sketch)


    var x = linspace(xmin,xmax,100)
    var ps = lag_pols(xs)
    var y = []
    
    for (var i = 0; i<x.length; i++) {
      y.push(ps[0].eval(x[i]))
    }

    plot(sketch, x,y, color = "red")
    var fc = ftd(xs[0], 1)
    sketch.circle(fc[0], fc[1], 12)
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(ps[1].eval(x[i]))
    }

    plot(sketch, x,y, color = "blue")
    var fc = ftd(xs[1], 1)
    sketch.circle(fc[0], fc[1], 12)
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(ps[2].eval(x[i]))
    }

    plot(sketch, x,y, color = "green")
    var fc = ftd(xs[2], 1)
    sketch.circle(fc[0], fc[1], 12)
  }

  //TODO optimize
  sketch.mousePressed = function(event) {
    if(event.button == 0) {
      var c0 = ftd(xs[0], 1)
      var c1 = ftd(xs[1], 1)
      var c2 = ftd(xs[2], 1)
      if (sketch.sqrt((sketch.mouseX - c0[0])**2 + (sketch.mouseY - c0[1])**2)<12) {
        holding = 0
      } else if (sketch.sqrt((sketch.mouseX - c1[0])**2 + (sketch.mouseY - c1[1])**2)<12) {
        holding = 1
      } else if (sketch.sqrt((sketch.mouseX - c2[0])**2 + (sketch.mouseY - c2[1])**2)<12) {
        holding = 2
      }
    }
  }

  sketch.mouseDragged = function() {
    if (holding != -1) {
      var c = dtf(sketch.mouseX, 0)
      xs[holding] = c[0]
    }
  }

  sketch.mouseReleased = function() {
    holding = -1
  }
})
