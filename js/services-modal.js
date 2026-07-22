(function () {
  const overlay  = document.getElementById('service-modal');
  if (!overlay) return;

  const box      = overlay.querySelector('.modal-box');
  const videoEl  = overlay.querySelector('.modal-video');
  const titleEl  = overlay.querySelector('.modal-title');
  const descEl   = overlay.querySelector('.modal-desc');
  const closeBtn = overlay.querySelector('.modal-close');
  const grid     = document.querySelector('.services-grid');

  function applyGridSize() {
    if (!grid) return;
    const r = grid.getBoundingClientRect();
    box.style.width  = r.width  + 'px';
    box.style.height = r.height + 'px';
    box.classList.toggle('vertical', r.height > r.width);
  }

  function openModal(title, desc, videoSrc) {
    titleEl.textContent = title;
    descEl.textContent  = desc;

    // Swap video source only if changed
    if (videoSrc && videoEl.getAttribute('src') !== videoSrc) {
      videoEl.src = videoSrc;
      videoEl.load();
    }

    applyGridSize();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoEl.play().catch(() => {});
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    videoEl.pause();
  }

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      openModal(
        card.dataset.popupTitle || card.querySelector('h3').textContent,
        card.dataset.popupDesc  || card.querySelector('p').textContent,
        card.dataset.video      || ''
      );
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  window.addEventListener('resize', () => {
    if (overlay.classList.contains('open')) applyGridSize();
  });
})();
