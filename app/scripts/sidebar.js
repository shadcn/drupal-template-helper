'use strict';

// Adds a Template sidebar panel to Chrome DevTools.
// When an element is selected, we figure out its Template Helper comments.

// Show Template templates when Template panel is opened.
window.addEventListener('load', function () {
  DrupalTemplateHelper.showTemplates();
});

// Add custom class if dark theme is enabled.
DrupalTemplateHelperOptions.get(['darkTheme'], function (settings) {
  if (settings.darkTheme) {
    document.getElementsByTagName('body')[0].className +=' dark-theme';
  }
});

// Show Template templates when an element is selected in the Elements panel.
chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  DrupalTemplateHelper.showTemplates();
});
