'use strict';

// Template DevTools Panel.

window.addEventListener('load', function () {
  // Create a port for messaging between devtools.js and background.js
  var port = chrome.runtime.connect({ name: "drupal-template-helper" });

  // Ask the background page for the current tab url.
  try {
    port.postMessage({
      'sender': 'drupal-template-helper-devtools',
      'message': 'current-tab-url'
    });
  } catch (e) {
    console.log(e);
  }

  // Listen for incoming messages on this port.
  port.onMessage.addListener(function (message) {
    if (message.sender == 'drupal-template-helper-background') {
      DrupalTemplateHelperDevtools.showForURL(message.url);
    }
  });
});

// Drupal Template Helper DevTools.
var DrupalTemplateHelperDevtools = {

  // Determines if the devtools panels should be shown.
  showForURL: function showForURL(urlString) {
    DrupalTemplateHelperOptions.get(['enabledSites'], function (settings) {
      // Create a URL object from urlString.
      var url = new URL(urlString);

      // Enable devtools panels if url matches.
      var enabledURLs = settings.enabledSites.split(',');
      for (var i in enabledURLs) {
        if (url.origin == enabledURLs[i].replace(/(\s|\/$)/gmi, '')) {
          DrupalTemplateHelperDevtools.create();
          break;
        }
      }
    });
  },

  // Creates the devtools panels.
  create: function create() {
    // Inject css into the devtools panel.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../styles/theme.css", false);
    xhr.send();
    chrome.devtools.panels.applyStyleSheet(xhr.responseText);

    // Add a Template sidebar panel.
    chrome.devtools.panels.elements.createSidebarPane('Templates', function (sidebar) {
      // Load sidebar.html into the sidebar.
      sidebar.setPage('../pages/sidebar.html');

      // Set the sidebar height.
      sidebar.setHeight('100vh');
    });
  }
};
