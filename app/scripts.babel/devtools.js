'use strict';

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
