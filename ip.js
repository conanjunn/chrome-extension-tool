chrome.runtime.sendMessage({
  name: 'getIp',
  url: window.location.href
}, function(response) {
  showTip(response.ip);
});

function showTip(ip) {
  var html = '<div style="position: fixed; right: 3px; bottom: 3px; color: white; font-size: 14px; padding: 5px; background: #000; border-radius: 5px; opacity: .8; z-index: 99999999; cursor: pointer;">' + ip + '</div>';
  var tmpEle = window.document.createElement('div');
  tmpEle.innerHTML = html;
  var ele = tmpEle.children[0];
  window.document.body.appendChild(ele);
  document.addEventListener('keyup', function(event) {
    var style = ele.style.display;
    if (event.keyCode === 27) {
      if (style === 'none') {
        ele.style.display = 'block';
      } else {
        ele.style.display = 'none';
      }
    }
  }, false);
  ele.addEventListener('click', function() {
    chrome.runtime.sendMessage({
      name: 'getDesc',
      url: window.location.href
    });
  }, false);
}
