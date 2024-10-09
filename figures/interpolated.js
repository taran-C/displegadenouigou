borderx = 20, bordery = 20
xmin = -2, xmax = 2
ymin = -3, ymax = 3
width = 10, height = 10

let interpolated = new p5(( sketch ) => {
  var holding = -1
  var xs = [-1.5,-0.5,0.5, 1.5]
  var fs = [2,0.5,-1, -1]

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

    //Plot the scaled lagrange polynomials
    for (var i = 0; i<x.length; i++) {
      y.push(fs[0] * ps[0].eval(x[i]))
    }
    plot(sketch, x,y, color = "lightpink")
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(fs[1] * ps[1].eval(x[i]))
    }
    plot(sketch, x,y, color = "aquamarine")
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(fs[2] * ps[2].eval(x[i]))
    }
    plot(sketch, x,y, color = "lightgreen")
    y = []

    for (var i = 0; i<x.length; i++) {
      y.push(fs[3] * ps[3].eval(x[i]))
    }
    plot(sketch, x,y, color = "yellow")
    y = []


    //Plot the generated function
    // interp_poly = fs[i]
    for (var i = 0; i<x.length; i++) {
      y.push(fs[0]*ps[0].eval(x[i]) + fs[1]*ps[1].eval(x[i]) + fs[2]*ps[2].eval(x[i]) + fs[3]*ps[3].eval(x[i]))
    }
    plot(sketch, x,y, color = "black")
    y = []


    //Drawing the control points
    var fc = ftd(xs[0], fs[0])
    sketch.fill("lightpink")
    sketch.stroke("red")
    sketch.circle(fc[0], fc[1], 12)

    var fc = ftd(xs[1], fs[1])
    sketch.fill("aquamarine")
    sketch.stroke("blue")
    sketch.circle(fc[0], fc[1], 12)

    var fc = ftd(xs[2], fs[2])
    sketch.fill("lightgreen")
    sketch.stroke("green")
    sketch.circle(fc[0], fc[1], 12)

    var fc = ftd(xs[3], fs[3])
    sketch.fill("yellow")
    sketch.stroke("darkgoldenrod")
    sketch.circle(fc[0], fc[1], 12)

  }

  //TODO optimize
  sketch.mousePressed = function(event) {
    if(event.button == 0) {
      var c0 = ftd(xs[0], fs[0])
      var c1 = ftd(xs[1], fs[1])
      var c2 = ftd(xs[2], fs[2])
      var c3 = ftd(xs[3], fs[3])
      if (sketch.sqrt((sketch.mouseX - c0[0])**2 + (sketch.mouseY - c0[1])**2)<12) {
        holding = 0
      } else if (sketch.sqrt((sketch.mouseX - c1[0])**2 + (sketch.mouseY - c1[1])**2)<12) {
        holding = 1
      } else if (sketch.sqrt((sketch.mouseX - c2[0])**2 + (sketch.mouseY - c2[1])**2)<12) {
        holding = 2
      } else if (sketch.sqrt((sketch.mouseX - c3[0])**2 + (sketch.mouseY - c3[1])**2)<12) {
        holding = 3
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
