function linspace(start, stop, n) {
    var arr = [];
    var step = (stop - start) / (n - 1);
    for (var i = 0; i < n; i++) {
        arr.push(start + (step * i));
    }
    return arr;
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

    plus(p) {
        var d = max(this.deg(), p.deg())
        var cs = Array(d).fill(0)

        for (var i = 0; i<=d; i++){
            if(this.deg() >= i && p.deg() >= i){
                cs[i] = this.coeffs[i] + p.coeffs[i]
            } else if (this.deg() < i) {
                cs[i] = p.coeffs[i]
            } else if (p.deg() < i) {
                cs[i] = this.coeffs[i]
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