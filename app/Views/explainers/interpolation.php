<div id="main">
  <div class="article">
    <h1>Interpolation</h1>
    <div class = "accordion" id="accordionArticle">
      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#part1" aria-expanded="true" aria-controls="part1">
            Introduction
          </button>
        </h2>
        <div id="part1" class="accordion-collapse collapse show" data-bs-parent="#accordionArticle">
          <div class="accordion-body">
            <p>Let's say, for the sake of argument, that you have a set of \(n\) discrete values \(f_i,1\leq i\leq n\) discretized at a position \(x_i\). They could for example be a set of temperature measurements at different places along a line.</p>

            <p>Imagine now that you need to have an estimate of the temperature at a place \(x\) you didn't measure. Since you have no data there, you'll have to use the values around this point to create a function \(f(x)\) that will fill the "holes" in your measurements.</p>

            <p>This is called ✨Interpolation✨</p>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button id = "btn-constant" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part2" aria-expanded="false" aria-controls="part2">
            Constant Interpolation
          </button>
        </h2>
        <div id="part2" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">
          <div class="accordion-body">
            <p>The first way to create such an interpolation function is to simply set the function equal to the closest value, meaning that \(f(x) = f_i\) if \(x_i\) is the closest to \(x\).</p>
            <!-- <p>With three points we would have \(f(x)=\left \{ \begin{array}{@{}l@{}} x_i \text{ if } \\ 0 \end{array} \right. \)</p> -->

            <p>To see how such a function changes along with its measurement you can move the \((x_i,f_i)\) represented by the colored circles.</p>

            <div id = "constant_int"><script src="<?php echo base_url('js/figures/interpolation/constant_int.js'); ?>"></script></div>

            <p>This does indeed give us a value of \(f(x),\forall x\), but it does present a few problems. Some data, in order to be physically correct, need to be continuous, and it is quite obvious here that this function doesn't respect this, as it has "jumps" when it goes from a value to another one. This can lead to quite a lot of problems, for example when applying a derivative. It also doesn't represent at all the variability between measurements that happens within the physical function we're trying to represent.</p>

            <p>The next step is then to try and find a continuous function that matches our data, wich we'll do with :</p>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part3" aria-expanded="false" aria-controls="part3">
            Linear Interpolation
          </button>
        </h2>
      
        <div id="part3" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">
          <div class="accordion-body">
            <p>The idea here is to draw a line between each two adjacent coefficients, wich will give a "smoother" result than the previous method. We also extend the line before (after) the first (last) point in order to have values \(\forall x\).</p>

            <p>The function to compute our interpolated value with \(x_i\leq x \leq x_{i+1}\) is \(f(x) = p \cdot(x-x_i) + f_i\) with \(p=\frac{f_{i+1}-f_i}{x_{i+1}-x_i}\)</p>

            <div id = "linear_int"><script src="<?php echo base_url('js/figures/interpolation/linear_int.js'); ?>"></script></div>
          </div>
        </div>
      </div>
        <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part4" aria-expanded="false" aria-controls="part4">
            Lagrange Polynomials
          </button>
        </h2>

        <div id="part4" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">
          <div class="accordion-body">
            <p>
              The Lagrange Polynomials associated to a set of \(x_i\) are : \(l_i(X) = \prod_{j=0,j\neq 1}^n \frac{X-x_j}{x_i-x_j}\)
            </p>
            <p>
              Below, you can see the lagrange polynomials associated to a set of three points, and move the \(x_i\) around to see the effect it has on all the polynomials.
            </p>

            <div id = "lagrange_polys"><script src="<?php echo base_url('js/figures/interpolation/lagrange_polys.js'); ?>"></script></div>
            
            <p>
              We see that the polynomials indeed respect the properties :
              \(deg(l_i)=n,\forall i\) and \(l_i(x_i)=\delta_{i,j},0\leq i,j\leq n\), meaning that \(l_i(x_i)=1\) and \(l_i(x_j)=0\) when \(j\neq i\)
            </p>

            <p>
              An interesting property (by design) of these polynomials is that any linear combination \(\sum_i c_il_i(X)\) will have value \(c_i\) at \(x_i\), and the resulting polynomial will be the lowest degree one to go through all those points.
              Our initial function \(f\) is therefore quite well approximated by the polynomial \(\sum_if_il_i(X)\)
            </p>
            
            <div id = "interpolated"><script src="<?php echo base_url('js/figures/interpolation/interpolated.js'); ?>"></script></div>

            <p>
              blablbalbala
            </p>
          </div>
        </div>
        </div>

      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part5" aria-expanded="false" aria-controls="part5">
          Post-Scriptum : Discrete derivation with Lagrange Polynomials
          </button>
        </h2>

        <div id="part5" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">

          <p></p>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part6" aria-expanded="false" aria-controls="part6">
          Post-Post-Scriptum : Runge's phenomenon
          </button>
        </h2>

        <div id="part6" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">
          <p></p>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class = "accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#part7" aria-expanded="false" aria-controls="part7">
          Conclusion
          </button>
        </h2>

        <div id="part7" class="accordion-collapse collapse" data-bs-parent="#accordionArticle">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</div>