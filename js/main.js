/* ==========================================================================
   WONJU MOUNTAIN RACE — 공통 스크립트 (PC/모바일 동일 동작)
   ========================================================================== */

/**
 * 2027 대회 예정일 (KST).
 * 일정 확정 전에는 null로 두세요 → 히어로에 COMING SOON 배너가 표시됩니다.
 * 확정되면 아래처럼 날짜를 넣으면 자동으로 카운트다운으로 전환됩니다.
 *   var RACE_DATE_2027 = new Date('2027-06-20T06:00:00+09:00');
 */
var RACE_DATE_2027 = null;

/* JS 활성 표시 — 스크롤 리빌 숨김은 이 클래스가 있을 때만 적용됩니다 */
document.documentElement.classList.add('js');

/* ---------- 헤더 스크롤 상태 ---------- */
var header = document.getElementById('siteHeader');
function onScrollHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

/* ---------- 모바일 메뉴 토글 ---------- */
var navToggle = document.getElementById('navToggle');
var gnb = document.getElementById('gnb');
navToggle.addEventListener('click', function () {
  var open = gnb.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
gnb.addEventListener('click', function (e) {
  if (e.target.tagName === 'A' && gnb.classList.contains('is-open')) {
    gnb.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- 카운트다운 / COMING SOON 전환 ----------
   RACE_DATE_2027가 null이면 COMING SOON 배너(기본 표시)를 유지하고,
   날짜가 설정되어 있으면 배너를 숨기고 카운트다운을 켭니다. */
var countdownEl = document.getElementById('countdown');
var comingSoonEl = document.getElementById('comingSoon');
var cd = {
  days: document.getElementById('cdDays'),
  hours: document.getElementById('cdHours'),
  mins: document.getElementById('cdMins'),
  secs: document.getElementById('cdSecs')
};
function pad(n) { return String(n).padStart(2, '0'); }
function tick() {
  var diff = RACE_DATE_2027.getTime() - Date.now();
  if (diff <= 0) {
    cd.days.textContent = '0';
    cd.hours.textContent = cd.mins.textContent = cd.secs.textContent = '00';
    return;
  }
  var s = Math.floor(diff / 1000);
  cd.days.textContent = String(Math.floor(s / 86400));
  cd.hours.textContent = pad(Math.floor((s % 86400) / 3600));
  cd.mins.textContent = pad(Math.floor((s % 3600) / 60));
  cd.secs.textContent = pad(s % 60);
}
if (RACE_DATE_2027 && countdownEl) {
  if (comingSoonEl) comingSoonEl.hidden = true;
  countdownEl.hidden = false;
  tick();
  setInterval(tick, 1000);
}

/* ---------- 스크롤 리빌 ---------- */
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('is-visible'); });
}

/* ---------- 통계 숫자 카운트업 ---------- */
function animateCount(el) {
  var target = parseInt(el.getAttribute('data-count'), 10);
  var prefix = el.getAttribute('data-prefix') || '';
  var suffix = el.getAttribute('data-suffix') || '';
  var useComma = el.getAttribute('data-comma') === 'true';
  var duration = 1400;
  var start = null;
  function fmt(n) { return useComma ? n.toLocaleString('ko-KR') : String(n); }
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var statEls = document.querySelectorAll('.stat strong[data-count]');
if ('IntersectionObserver' in window) {
  var statIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statEls.forEach(function (el) { statIo.observe(el); });
} else {
  statEls.forEach(animateCount);
}

/* ---------- 사전알림 폼 (데모 동작) ----------
   실제 운영 시: form의 submit을 스티비/메일침프/구글폼 등
   사용하는 폼 서비스로 연결하세요. */
var notifyForm = document.getElementById('notifyForm');
var notifyDone = document.getElementById('notifyDone');
notifyForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('notifyEmail');
  if (!email.checkValidity() || !email.value.trim()) {
    email.focus();
    return;
  }
  notifyForm.hidden = true;
  notifyDone.hidden = false;
});
