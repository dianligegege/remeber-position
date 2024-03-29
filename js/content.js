const docuemntDom = document.documentElement;

window.addEventListener('load', async () => {
  const messageObj = {
    name: 'load_message',
  };
  chrome.runtime.sendMessage(JSON.stringify(messageObj), (res) => {
    const historyMap = res.historyMap;
    const smoothStatus = res.smoothStatus;
    const url = encodeURIComponent(window.location.href);
    const scrollTop = historyMap[url];
    if (scrollTop && scrollTop > 0) {
      setTimeout(() => {
        window.scroll({
          top: scrollTop,
          behavior: smoothStatus ? "smooth" : 'instant',
        });
      }, 500);
    }
  });
})

window.addEventListener('beforeunload', async () => {
  const url = encodeURIComponent(window.location.href);
  const scrollTop = docuemntDom?.scrollTop || 0;
  const messageObj = {
    name: 'beforeunload_message',
    url,
    scrollTop,
  };
  chrome.runtime.sendMessage(JSON.stringify(messageObj));
});
