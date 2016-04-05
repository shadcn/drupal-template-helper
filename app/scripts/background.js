'use strict';

// Connect to port and listen for messages.

chrome.runtime.onConnect.addListener(function (port) {
  // Listen for message from devtools.js
  port.onMessage.addListener(function (message) {
    if (message.sender == 'drupal-template-helper-devtools' && message.message == 'current-tab-url') {
      // Get the current active tab.
      chrome.tabs.query({ 'active': true }, function (tabs) {

        // Send the url of the active tab to devtools.js
        if (tabs.length) {
          port.postMessage({
            'sender': 'drupal-template-helper-background',
            'url': tabs[0].url
          });
        }
      });
    }
  });
});

// Open Options page on browserAction click.
chrome.browserAction.onClicked.addListener(function (tab) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  }
});
