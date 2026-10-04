// 현재 접속한 사이트의 도메인이 유튜브인지 확인
if (window.location.hostname.includes('youtube.com')) {
  // 유튜브인 경우 스크립트 실행을 중단하여 광고 차단에서 제외
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

  // 동적으로 생성되는 광고 처리
  const observer = new MutationObserver(removeAds);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('DOMContentLoaded', removeAds);
}
