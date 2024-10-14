borderx = 20, bordery = 20
xmin = -2, xmax = 2
ymin = -3, ymax = 3
width = 150, height = 400

let constant_int = new p5(( sketch ) => {
  var holding = -1
  let points = [{'x' : -1, 'f' : 2},{'x' : 0, 'f' : 0.5},{'x' : 1, 'f' : -1}]

  sketch.setup = function() {
    sketch.noLoop()
    var canvasDiv = document.getElementById('constant_int');
    var canvas = sketch.createCanvas(width, height);
    canvas.parent('constant_int')
    
    //Just clicked open
    collapsable = $('#part2')
    
    collapsable.on('show.bs.collapse', function(){
      sketch.loop()
    })

    //Finished opening
    collapsable.on('shown.bs.collapse', function(){
      width = canvasDiv.offsetWidth;
      height = 400
      sketch.resizeCanvas(width, height)
    })

    //Just hidden
    collapsable.on('hide.bs.collapse', function(){
      sketch.noLoop()
    })
  }


  sketch.draw = function() {
    sketch.background(200);
    draw_axes(sketch)

    let npoints = 200
    var x = linspace(xmin,xmax,npoints)
    let y = []

    let sortedpoints = points.toSorted((a,b) => a.x - b.x)

    for (let i = 0; i<npoints; i++){
        if (x[i] < (sortedpoints[0].x+sortedpoints[1].x)/2){
            y.push(sortedpoints[0].f)
        } else if (x[i] < (sortedpoints[1].x+sortedpoints[2].x)/2) {
            y.push(sortedpoints[1].f)
        } else {
            y.push(sortedpoints[2].f)
        }
    }

    //Plot constant interpolation function
    plot(sketch, x,y, color = "black")

    //Draw control points
    sketch.strokeWeight(2)
    sketch.fill("lightpink")
    sketch.stroke("red")
    fc = ftd(points[0].x, points[0].f)
    sketch.circle(fc[0], fc[1], 12)

    sketch.fill("aquamarine")
    sketch.stroke("blue")
    fc = ftd(points[1].x, points[1].f)
    sketch.circle(fc[0], fc[1], 12)

    sketch.fill("lightgreen")
    sketch.stroke("green")
    fc = ftd(points[2].x, points[2].f)
    sketch.circle(fc[0], fc[1], 12)
  }

  //TODO optimize
  sketch.mousePressed = function(event) {
    if(event.button == 0) {
      var c0 = ftd(points[0].x, points[0].f)
      var c1 = ftd(points[1].x, points[1].f)
      var c2 = ftd(points[2].x, points[2].f)
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
      points[holding].x = c[0]
      points[holding].f = c[1]
    }
  }

  sketch.mouseReleased = function() {
    holding = -1
  }
})
