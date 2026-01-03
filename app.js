(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const blocks = Array.from(document.querySelectorAll("[data-depth]"));

  yearEl.textContent = String(new Date().getFullYear());

  const saved = localStorage.getItem("ponty_theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ponty_theme", next);
  });

  // soft 3D on scroll
  let lastY = window.scrollY;
  let raf = 0;

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function render() {
    raf = 0;
    const y = window.scrollY;
    const delta = y - lastY;
    lastY = y;

    blocks.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height * 0.5;
      const vh = window.innerHeight || 800;

      const t = (center - vh * 0.5) / (vh * 0.5);
      const tilt = clamp(t, -1, 1);

      const rx = tilt * -3.2;
      const ry = clamp(delta, -40, 40) * 0.03;

      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(render);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
