'use strict';

// Adds a Twig sidebar panel to Chrome DevTools.
// When an element is selected, we figure out its Twig Helper comments.

// Show Twig templates when Twig panel is opened.
window.addEventListener('load', function() {
  // DrupalTwigHelperOptions.get(['enabledSites'], function (settings) {
  //   console.log(settings);
  // });

  DrupalTwigHelper.showTwigTemplates();

});

// Show Twig templates when an element is selected in the Elements panel.
chrome.devtools.panels.elements.onSelectionChanged.addListener(function(){
  DrupalTwigHelper.showTwigTemplates();
});
