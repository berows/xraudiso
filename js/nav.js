(function () {
  const btn     = document.querySelector('.nav-hamburger');
  const drawer  = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-overlay');
  if (!btn) return;

  function open() {
    btn.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();
