// Controls for the brain viewer page: rotate/stop + show/hide each hemisphere.
// The model has two materials, "hemisphere_L" and "hemisphere_R".

(function () {
  var mv = document.querySelector(".brain-full");
  if (!mv) return;

  // ----- rotate / stop -----
  var rotating = true;
  var rotateBtn = document.getElementById("btn-rotate");
  if (rotateBtn) {
    rotateBtn.addEventListener("click", function () {
      rotating = !rotating;
      if (rotating) {
        mv.setAttribute("auto-rotate", "");
        rotateBtn.textContent = "[ stop rotation ]";
      } else {
        mv.removeAttribute("auto-rotate");
        rotateBtn.textContent = "[ rotate ]";
      }
    });
  }

  // ----- show / hide hemispheres (toggle material alpha) -----
  function setVisible(mat, visible) {
    var pbr = mat.pbrMetallicRoughness;
    var c = pbr.baseColorFactor;
    mat.setAlphaMode(visible ? "OPAQUE" : "BLEND");
    pbr.setBaseColorFactor([c[0], c[1], c[2], visible ? 1 : 0]);
  }

  function wireHemisphere(btnId, materialName) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    var mat = mv.model && mv.model.materials
      ? mv.model.materials.find(function (m) { return m.name === materialName; })
      : null;
    if (!mat) return;
    var visible = true;
    btn.addEventListener("click", function () {
      visible = !visible;
      setVisible(mat, visible);
      btn.classList.toggle("off", !visible);
    });
  }

  mv.addEventListener("load", function () {
    wireHemisphere("btn-left", "hemisphere_L");
    wireHemisphere("btn-right", "hemisphere_R");
  });
})();
