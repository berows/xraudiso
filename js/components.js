(function () {
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
          <li><a href="${base}index.html#product" data-i18n="nav.products">제품</a></li>
          <li><a href="${base}index.html#services" data-i18n="nav.tech">기술개발</a></li>
          <li><a href="${base}index.html#demo" data-i18n="nav.demo">기술데모</a></li>
          <li><a href="${base}index.html#contact" class="nav-cta" data-i18n="nav.contact">문의하기</a></li>
        </ul>
        <div class="nav-right">
          <div class="lang-switcher">
            <button class="lang-btn" data-lang="ko">KO</button>
            <button class="lang-btn" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="ja">JA</button>
          </div>
          <button class="nav-hamburger" aria-label="메뉴 열기" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>`;

    if (!document.querySelector('.nav-overlay')) {
      nav.insertAdjacentHTML('afterend', `
        <div class="nav-overlay"></div>
        <div class="nav-drawer">
          <ul>
            <li><a href="${base}index.html#product" data-i18n="nav.products">제품</a></li>
            <li><a href="${base}index.html#services" data-i18n="nav.tech">기술개발</a></li>
            <li><a href="${base}index.html#demo" data-i18n="nav.demo">기술데모</a></li>
            <li><a href="${base}index.html#contact" data-i18n="nav.contact">문의하기</a></li>
          </ul>
        </div>`);
    }

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

    nav.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => window.i18n && window.i18n.setLang(btn.getAttribute('data-lang')));
    });
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
          <p data-i18n-html="footer.brand.info">(주)오디에스오<br />강원특별자치도 원주시 지정면 기업도시로 200,<br />의료기기종합지원센터 603호</p>
          <p><a href="mailto:audiso@naver.com">audiso@naver.com</a></p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.col1.title">제품</h4>
          <ul>
            <li><a href="https://audiso.co.kr/hearingapp" target="_blank" data-i18n="footer.col1.link1">모두의 보청기</a></li>
            <li><a href="${base}products/prod_mindtone.html" data-i18n="footer.col1.link2">마인드톤+</a></li>
            <li><a href="${base}products/prod_ptavr.html" data-i18n="footer.col1.link3">청력검사VR</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.col2.title">기술데모</h4>
          <ul>
            <li><a href="${base}demo/ssnhl/SSNHL_predi_ver_3_0.html" data-i18n="footer.col2.link1">돌발성난청 호전 예측 시뮬레이터</a></li>
            <li><a href="${base}demo/earCheck/app.html" data-i18n="footer.col2.link2">AI 귀 건강 분석</a></li>
            <li><a href="https://drive.google.com/drive/folders/1lzPKTtVgOaqA085jJSXPqi1IyCFQUsg-?usp=drive_link" target="_blank" rel="noopener">
            WithHear Press Kit</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>©2026 Audiso, Inc. All rights reserved.</p>
        <p><a href="https://audiso.co.kr/" target="_blank" rel="noopener" data-i18n="footer.company.link">주식회사 오디에스오</a></p>
      </div>`;
  }

  // Apply translations after nav + footer are injected
  if (window.i18n) window.i18n.applyAll();
})();
