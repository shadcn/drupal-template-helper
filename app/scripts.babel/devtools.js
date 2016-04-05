'use strict';

// Twig DevTools Panel.

window.addEventListener('load', function() {
  // Create a port for messaging between devtools.js and background.js
  var port = chrome.runtime.connect({name: "drupal-twig-helper"});

  // Ask the background page for the current tab url.
  try {
    port.postMessage({
      'sender': 'drupal-twig-helper-devtools',
      'message': 'current-tab-url',
    });
  }
  catch(e) {
    console.log(e);
  }

  // Listen for incoming messages on this port.
  port.onMessage.addListener(function (message) {
    if (message.sender == 'drupal-twig-helper-background') {
      DrupalTwigHelperDevtools.showForURL(message.url);
    }
  });
});

// Drupal Twig Helper DevTools.
var DrupalTwigHelperDevtools = {

  // Determines if the devtools panels should be shown.
  showForURL: function(url) {
    DrupalTwigHelperOptions.get(['enabledSites'], function (settings) {
      // Strip trailing slash.
      url = url.replace(/(\s|\/$)/gi, '');

      // Enable devtools panels if url matches.
      var enabledURLs = settings.enabledSites.split(',');
      for (var i in enabledURLs) {
        if (url == enabledURLs[i].replace(/(\s|\/$)/gmi, '')) {
          DrupalTwigHelperDevtools.create();
          break;
        }
      }
    });
  },

  // Creates the devtools panels.
  create: function() {
    // Inject css into the devtools panel.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../css/theme.css", false);
    xhr.send();
    chrome.devtools.panels.applyStyleSheet(xhr.responseText);

    // Add a Twig sidebar panel.
    chrome.devtools.panels.elements.createSidebarPane('Twig', function (sidebar) {
      // Load sidebar.html into the sidebar.
      sidebar.setPage('../pages/sidebar.html');

      // Set the sidebar height.
      sidebar.setHeight('100vh');
    });
  }
}
