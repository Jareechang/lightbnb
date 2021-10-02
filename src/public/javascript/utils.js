function getUrlParams(urlInstance) {
  const url = urlInstance || new URL(window.location.href);
  const page = url.searchParams.get('page');
  console.log(`getUrlParams, page: ${page}, window.href : ${window.location.href}`);
  const pageNumber = +page || 1;
  return {
    page: pageNumber
  };
}
window.getUrlParams = getUrlParams;

function getSearchParams(urlInstance) {
  const hasQuestionMark = !!(urlInstance.search || window.location.search).match(/\?/);
  const urlParams = getUrlParams(urlInstance);
  let result = hasQuestionMark ? '' : '?';
  if (urlParams.page) {
    result += `page=${urlParams.page}`;
  }
  return result;
}
window.getSearchParams = getSearchParams;

function clearUrl() {
  window.history.pushState({ search: ''}, '', '/');
}
window.clearUrl;

function historyPush(url, data = {}) {
  window.history.pushState(data, '', url);
}
window.clearUrl;
