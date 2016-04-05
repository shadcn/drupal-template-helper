'use strict';

// Options page for the Drupal Twig Helper Extension.

// Attach restore event to dom loaded.
document.addEventListener('DOMContentLoaded', function () {
  DrupalTwigHelperOptions.get(['enabledSites'], function (settings) {
    document.getElementById('twig-helper-enabled-sites').value = settings.enabledSites || '';
  })
});

// Attach save event to save button.
document.getElementById('save').addEventListener('click', function () {
  // Save settings.
  DrupalTwigHelperOptions.save({
    enabledSites: document.getElementById('twig-helper-enabled-sites').value
  }, function () {
    DrupalTwigHelperOptions.alert('Options saved successfully');
  });
});
