(function () {
  // Derive base path from this script's src attribute (works with file:// and http://)
  // index.html loads "js/components.js"      → base = ""
  // products/  loads "../js/components.js"   → base = "../"
  const base = (document.currentScript.getAttribute('src') || '')
    .replace('js/components.js', '');

  // ── NAV ──────────────────────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="${base}index.html" class="logo">
          <img src="${base}images/audiso.svg" alt="Audiso 오디에스오" /><span class="logo-tag">Tech.</span>
        </a>
        <ul class="nav-links">
          <li><a href="${base}index.html#product">제품</a></li>
          <li><a href="${base}index.html#services">기술개발</a></li>
          <li><a href="${base}index.html#demo">기술데모</a></li>
          <li><a href="${base}index.html#contact" class="nav-cta">문의하기</a></li>
        </ul>
        <button class="nav-hamburger" aria-label="메뉴 열기" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;

    // Inject overlay + drawer after <nav> (only if not already present)
    if (!document.querySelector('.nav-overlay')) {
      nav.insertAdjacentHTML('afterend', `
        <div class="nav-overlay"></div>
        <div class="nav-drawer">
          <ul>
            <li><a href="${base}index.html#product">제품</a></li>
            <li><a href="${base}index.html#services">기술개발</a></li>
            <li><a href="${base}index.html#demo">기술데모</a></li>
            <li><a href="${base}index.html#contact">문의하기</a></li>
          </ul>
        </div>`);
    }

    // Hamburger behavior (from nav.js)
    const btn     = nav.querySelector('.nav-hamburger');
    const drawer  = document.querySelector('.nav-drawer');
    const overlay = document.querySelector('.nav-overlay');

    function openDrawer() {
      btn.classList.add('open');
      drawer.classList.add('open');
      overlay.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      btn.classList.remove('open');
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => btn.classList.contains('open') ? closeDrawer() : openDrawer());
    overlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  // ── FOOTER ───────────────────────────────────────────────────────────
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="${base}index.html" class="logo">
            <img src="${base}images/audiso.svg" alt="Audiso 오디에스오" />
          </a>
          <p>(주)오디에스오<br />강원특별자치도 원주시 지정면 기업도시로 200,<br />의료기기종합지원센터 603호</p>
          <p>contact@audiso.co.kr</p>
        </div>
        <div class="footer-col">
          <h4>제품</h4>
          <ul>
            <li><a href="${base}products/prod_withhear.html">마인드톤</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>기술개발</h4>
          <ul>
            <li><a href="${base}index.html#services">디지털 트윈</a></li>
            <li><a href="${base}index.html#services">AI 디지털 진단</a></li>
            <li><a href="${base}index.html#services">XR 의료 시뮬레이터</a></li>
            <li><a href="${base}index.html#services">모바일 헬스케어</a></li>
            <li><a href="${base}index.html#services">임상 데이터 분석</a></li>
            <li><a href="${base}index.html#services">원격 재활 솔루션</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>회사</h4>
          <ul>
            <li><a href="${base}index.html#demo">기술데모</a></li>
            <li><a href="${base}index.html#partners">협력 기관</a></li>
            <li><a href="${base}index.html#contact">문의</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>©2026 Audiso, Inc. All rights reserved.</p>
        <p>주식회사 오디에스오</p>
      </div>`;
  }
})();
