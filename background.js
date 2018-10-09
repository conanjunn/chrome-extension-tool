// get IP using webRequest
var currentIPList = {};
chrome.webRequest.onCompleted.addListener(function(info) {
  if (info.url) {
    currentIPList[info.url] = info.ip;
  }
}, {
  urls: [],
  types: []
}, []);


chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  if (message.name === 'getIp') {
    var ip = currentIPList[message.url];
    reply({
      ip: currentIPList[message.url]
    });
  } else if (message.name === 'getDesc') {
    var ip = currentIPList[message.url];
    if (ip) {
      chrome.tabs.create({
        url: 'http://www.ip138.com/ips138.asp?ip=' + ip + '&action=2',
        active: true
      });
    }
  }
});

// open: chrome://flags/#extensions-on-chrome-urls
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({}, function(tabs) {
    var needCreate = true;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url == 'chrome://net-internals/#dns') {
        chrome.tabs.executeScript(tabs[i].id, {
          file: "flush.js"
        });
        needCreate = false;
        break;
      }
    }
    if (needCreate) {
      chrome.tabs.create({
        url: 'chrome://net-internals/#dns',
        active: false
      }, function(tab) {
        chrome.tabs.executeScript(tab.id, {
          file: "flush.js"
        });
      });
    }
  });
});
