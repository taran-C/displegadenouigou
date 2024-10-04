borderx = 20, bordery = 20
xmin = -2, xmax = 2
ymin = -3, ymax = 3
width = 10, height = 10

let interpolated = new p5(( sketch ) => {
  var holding = -1
  var xs = [-1,0,1]
  var fs = [2,0.5,-1]

  sketch.setup = function() {
    var canvasDiv = document.getElementById('interpolated');
    width = canvasDiv.offsetWidth;
    height = 400
    var canvas = sketch.createCanvas(width, height);
    canvas.parent('interpolated')
  }


  sketch.draw = function() {
    sketch.background(240);
    draw_axes(sketch)


    var x = linspace(xmin,xmax,100)
    var ps = lag_pols(xs)
    var y = []
    

    //Plot the generated function
    // interp_poly = fs[i]
    for (var i = 0; i<x.length; i++) {
      y.push(fs[0]*ps[0].eval(x[i]) + fs[1]*ps[1].eval(x[i]) + fs[2]*ps[2].eval(x[i]))
    }
    plot(sketch, x,y, color = "black")
    y = []

    //Plot the scaled lagrande polynomials
    for (var i = 0; i<x.length; i++) {
      y.push(fs[0] * ps[0].eval(x[i]))
    }
    plot(sketch, x,y, color = "lightpink")
    var fc = ftd(xs[0], fs[0])
    sketch.stroke("red")
    sketch.circle(fc[0], fc[1], 12)
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(fs[1] * ps[1].eval(x[i]))
    }

    plot(sketch, x,y, color = "aquamarine")
    var fc = ftd(xs[1], fs[1])
    sketch.stroke("blue")
    sketch.circle(fc[0], fc[1], 12)
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(fs[2] * ps[2].eval(x[i]))
    }

    plot(sketch, x,y, color = "lightgreen")
    var fc = ftd(xs[2], fs[2])
    sketch.stroke("green")
    sketch.circle(fc[0], fc[1], 12)
  }

  //TODO optimize
  sketch.mousePressed = function(event) {
    if(event.button == 0) {
      var c0 = ftd(xs[0], fs[0])
      var c1 = ftd(xs[1], fs[1])
      var c2 = ftd(xs[2], fs[2])
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
      var c = dtf(sketch.mouseX, sketch.mouseY)
      xs[holding] = c[0]
      fs[holding] = c[1]
    }
  }

  sketch.mouseReleased = function() {
    holding = -1
  }
})
