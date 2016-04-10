'use strict';

// Options page for the Drupal Template Helper Extension.

// Attach restore event to dom loaded.

document.addEventListener('DOMContentLoaded', function () {
  DrupalTemplateHelperOptions.get(['enabledSites', 'showComments'], function (settings) {
    console.log(settings);
    document.getElementById('template-helper-enabled-sites').value = settings.enabledSites || '';
    document.getElementById('template-helper-show-comments').checked = settings.showComments || false;
  });
});

// Attach save event to save button.
document.getElementById('save').addEventListener('click', function () {
  // Save settings.
  DrupalTemplateHelperOptions.save({
    enabledSites: document.getElementById('template-helper-enabled-sites').value,
    showComments: document.getElementById('template-helper-show-comments').checked
  }, function () {
    DrupalTemplateHelperOptions.alert('Options saved successfully');
  });
});
