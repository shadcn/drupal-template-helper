'use strict';

// Options page for the Drupal Template Helper Extension.

// Attach restore event to dom loaded.
document.addEventListener('DOMContentLoaded', function () {
  DrupalTemplateHelperOptions.get(['enabledSites'], function (settings) {
    document.getElementById('template-helper-enabled-sites').value = settings.enabledSites || '';
  })
});

// Attach save event to save button.
document.getElementById('save').addEventListener('click', function () {
  // Save settings.
  DrupalTemplateHelperOptions.save({
    enabledSites: document.getElementById('template-helper-enabled-sites').value
  }, function () {
    DrupalTemplateHelperOptions.alert('Options saved successfully');
  });
});
