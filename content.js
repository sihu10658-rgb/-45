// 현재 접속한 사이트의 도메인이 유튜브인지 확인
if (window.location.hostname.includes('youtube.com')) {
  console.log('유튜브는 광고 차단 대상에서 제외됩니다.');
} else {
  // 유튜브가 아닌 다른 모든 사이트에서 실행될 광고 제거 로직
  const adSelectors = [
    'iframe[src*="ads"]',
    '.adsbygoogle',
    'div[id^="google_ads"]',
    '.ad-banner',
    'ins.adsbygoogle'
  ];

  function removeAds() {
    adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.style.display = 'none'; // 광고 영역 숨기기
      });
    });
  }

  // DOM이 로드된 이후에 감시자와 초기 실행을 안전하게 수행
  function initAdBlocker() {
    if (!document.body) return;

    removeAds();

    // 동적으로 생성되는 광고 처리
    const observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAdBlocker);
  } else {
    initAdBlocker();
  }
}
