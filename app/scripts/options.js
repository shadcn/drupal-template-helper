'use strict';

// Options page for the Drupal Template Helper Extension.

// Attach restore event to dom loaded.

document.addEventListener('DOMContentLoaded', function () {
  DrupalTemplateHelperOptions.get(['enabledSites', 'showComments', 'darkTheme'], function (settings) {
    console.log(settings);
    document.getElementById('template-helper-enabled-sites').value = settings.enabledSites || '';
    document.getElementById('template-helper-show-comments').checked = settings.showComments || false;
    document.getElementById('template-helper-dark-theme').checked = settings.darkTheme || false;
  });
});

// Attach save event to save button.
document.getElementById('save').addEventListener('click', function () {
  // Save settings.
  DrupalTemplateHelperOptions.save({
    enabledSites: document.getElementById('template-helper-enabled-sites').value,
    showComments: document.getElementById('template-helper-show-comments').checked,
    darkTheme: document.getElementById('template-helper-dark-theme').checked
  }, function () {
    DrupalTemplateHelperOptions.alert('Options saved successfully');
  });
});
