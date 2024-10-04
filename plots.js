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

function draw_axes(sketch) {
  c = 100 //Draw color
  sketch.stroke(c)
  sketch.fill(c)

  sw = 4 //
  sketch.strokeWeight(sw)

  //X axis
  sketch.line(bordery,height-borderx,width-bordery,height-borderx) 
  sketch.triangle(width-bordery, height-borderx, width-bordery-2*sw, height-borderx-sw, width-bordery-2*sw, height-borderx+sw)

  //Y axis
  sketch.line(bordery,height-borderx,bordery,borderx) 
  sketch.triangle(bordery,borderx,bordery-sw,borderx+2*sw,bordery+sw,borderx+2*sw)


  sketch.strokeWeight(1)
  sketch.text(xmin.toString(), bordery, height - borderx + 3*sw)
  sketch.text(xmax.toString(), width-bordery, height - borderx + 3*sw)


  sketch.text(ymin.toString(), bordery -4*sw, height - borderx)
  sketch.text(ymax.toString(), bordery -4*sw, borderx + 3*sw)
}

function plot(sketch, x, y, color = 0) {
  sketch.strokeWeight(2)
  sketch.stroke(color)
  sketch.fill(color)
  n = x.length
  if (n != y.length) {
    return
  }
  for (i = 0; i<n-1; i++) {
    p1 = ftd(x[i], y[i])
    p2 = ftd(x[i+1], y[i+1])
    sketch.line(p1[0], p1[1], p2[0], p2[1])
  }

}


function print_mouse_coords() {
    cs = dtf(mouseX,mouseY)
    strokeWeight(1)
    text(str(cs[0]), 50, 50)
    text(str(cs[1]), 50, 70)
  }