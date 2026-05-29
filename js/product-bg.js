(function () {
  const canvas = document.getElementById('product-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COUNT    = 60;
  const MAX_DIST = 180;
  const SPEED    = 0.25;
  let particles  = [];
  let raf;

  /* ── 리사이즈 ── */
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  /* ── 파티클 ── */
  class Particle {
    constructor() { this.init(); }

    init() {
      this.x         = Math.random() * canvas.width;
      this.y         = Math.random() * canvas.height;
      this.vx        = (Math.random() - 0.5) * SPEED;
      this.vy        = (Math.random() - 0.5) * SPEED;
      this.r         = Math.random() * 4 + 1.6;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
      this.alpha     = this.baseAlpha;
      this.pulse     = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulse += 0.014;
      this.alpha  = this.baseAlpha + Math.sin(this.pulse) * 0.12;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0)             { this.x = 0;             this.vx *= -1; }
      if (this.x > canvas.width)  { this.x = canvas.width;  this.vx *= -1; }
      if (this.y < 0)             { this.y = 0;             this.vy *= -1; }
      if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1; }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,182,0,${this.alpha + 0.25})`;
      ctx.fill();
    }
  }

  /* ── 연결선 ── */
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > MAX_DIST) continue;

        const t = 1 - dist / MAX_DIST;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(245,182,0,${t * t * 0.22})`;
        ctx.lineWidth   = t * 1.0;
        ctx.stroke();
      }
    }
  }

  /* ── 주변 비네트 (크림 배경색으로) ── */
  function drawVignette() {
    const grd = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.height * 0.05,
      canvas.width / 2, canvas.height / 2, canvas.height * 1.0
    );
    grd.addColorStop(0,   'rgba(243,237,227,0)');
    grd.addColorStop(1,   'rgba(243,237,227,0.65)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ── 애니메이션 루프 ── */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    drawVignette();
    raf = requestAnimationFrame(animate);
  }

  /* ── 초기화 ── */
  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
    cancelAnimationFrame(raf);
    animate();
  }

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);

  init();
})();
