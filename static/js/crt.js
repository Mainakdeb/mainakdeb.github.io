// Retro CRT theme behaviour: inject overlays + green/amber toggle.
// Kept intentionally tiny and dependency-free.

(function () {
  // Inject the full-screen CRT overlays so every page gets them
  // without repeating markup in each template.
  // glare + vignette disabled (they created the center haze); scanlines stay
  var overlays = ["interlaced"];
  overlays.forEach(function (id) {
    if (!document.getElementById(id)) {
      var el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
  });

  // Persisted phosphor toggle: cycles green -> amber -> red.
  // "green" is the default (no data-theme attribute).
  var STORAGE_KEY = "crt-theme";
  var THEMES = ["green", "amber", "red"];

  var apply = function (theme) {
    if (theme === "green") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  var current = "green";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (THEMES.indexOf(saved) !== -1) current = saved;
  } catch (e) {}
  apply(current);

  var btn = document.querySelector(".theme-toggle");
  if (btn) {
    var render = function () {
      btn.textContent = "[ " + current + " ]";
    };
    render();
    btn.addEventListener("click", function () {
      current = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
      apply(current);
      try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
      render();
    });
  }
})();
