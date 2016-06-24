'use strict';

// Drupal Template Helper.

// The comment node type.

var COMMENT_NODE_TYPE = 8;

// The Template panel element.
var $TEMPLATE_PANEL = document.getElementById('template-panel');

// The error message to show when no template is found.
var TEMPLATE_HELPER_ERROR_MESSAGE = 'No templates found.';

// Template helper info.
var TEMPLATE_HELPER_REGEX = {
  "current_template": {
    "title": "Current template",
    "regex": "^BEGIN\\s?OUTPUT\\s?from\\s?\\'(.*)\\'$",
    "modifier": "i"
  },
  "template_suggestions": {
    "title": "Template suggestions",
    "regex": "([\\*|x]\\s{1}\\S*)",
    "modifier": "gmi"
  },
  "theme_hook": {
    "title": "Hook",
    "regex": "^THEME\\s?HOOK\\s?:\\s?\\'(.*)\\'$",
    "modifier": "i"
  },
  "d7_theme_hook": {
    "title": "Hook",
    "regex": "^CALL\\:\\s?theme\\(\\'(.*)\\'\\)$",
    "modifier": "i"
  }
};

// Drupal Template Helper.
var DrupalTemplateHelper = {

  // Return Theme debug comments for an element.
  getCommentsForElement: function getCommentsForElement(element) {
    var comments = [];

    // Loop through previous siblings until we hit <-- THEME DEBUG -->.
    // Assumming <-- THEME DEBUG --> is where the Template helper comments starts.
    var prevSibling = element.previousSibling;
    while (!/\s+THEME DEBUG\s+/i.test(prevSibling.nodeValue)) {
      if (prevSibling.nodeType === 8) {
        comments.push(prevSibling.nodeValue.trim());
      }
      prevSibling = prevSibling.previousSibling;
    }

    return comments;
  },

  // Show Template templates callback.
  showTemplates: function showTemplates() {
    chrome.devtools.inspectedWindow.eval("(" + DrupalTemplateHelper.getCommentsForElement.toString() + ")($0)", function (result, exceptionInfo) {
      // Log message if error.
      if (typeof exceptionInfo !== 'undefined') {
        DrupalTemplateHelper.log(TEMPLATE_HELPER_ERROR_MESSAGE);
        return;
      }

      // Get templates from result and display.
      var templates = DrupalTemplateHelper.getTemplatesFromComments(result);
      DrupalTemplateHelper.logTemplates(templates);
    });
  },

  // Returns an array of templates from Template helper comments.
  getTemplatesFromComments: function getTemplatesFromComments(comments) {
    var templates = [];

    for (var i in comments) {
      var comment = comments[i];
      templates.push(DrupalTemplateHelper.parseComment(comment));
    }

    return templates;
  },

  // Parses a comment string into a renderable template object.
  parseComment: function parseComment(comment) {
    var output = {};

    for (var name in TEMPLATE_HELPER_REGEX) {
      var templateHelperInfo = TEMPLATE_HELPER_REGEX[name];

      // Extract values from template using provided regex.
      var regex = new RegExp(templateHelperInfo.regex, templateHelperInfo.modifier);
      var matches;
      if ((matches = regex.exec(comment)) !== null) {
        output.title = templateHelperInfo.title;
        output.values = [matches[1]];

        // Loop for multiline modifiers.
        if (templateHelperInfo.modifier.indexOf('m') !== -1) {
          while ((matches = regex.exec(comment)) !== null) {
            output.values.push(matches[1]);
          }
        }
      }
    }

    return output;
  },

  // Logs a message to the Template panel.
  log: function log(message) {
    $TEMPLATE_PANEL.innerHTML = '<p class="message">' + message + '<p>';
  },

  logTemplates: function logTemplates(templates) {
    var list = document.createElement('ul');
    var highlighted = false;
    for (var i in templates) {
      var template = templates[i];

      if (template.values.length) {
        // Create a list item.
        var listItem = document.createElement('li');

        // Add title.
        var title = document.createElement('strong');
        title.className = 'label';
        title.innerHTML = template.title;
        listItem.appendChild(title);

        // Add values;
        var valuesList = document.createElement('ul');
        for (var j in template.values) {
          var valuesListItem = document.createElement('li');
          var value = template.values[j];
          var safeValue = value.replace(/([x|*]\s{1})/g, '');

          // Create the function call.
          if (template.title == 'Hook') {
            safeValue = DrupalTemplateHelper.getHookPreprocessFunctionForHook(value);
          }

          // Highlight current template.
          var regex = new RegExp("(x\\s{1}\\S*)", "i");
          if (!highlighted && value.match(regex)) {
            valuesListItem.className = 'selected';
            highlighted = true;
          }

          // Add code.
          var code = document.createElement('code');
          code.innerHTML = safeValue;
          valuesListItem.appendChild(code);

          // Create a copy button.
          var button = document.createElement('button');
          button.innerHTML = 'Copy';
          button.value = safeValue;
          button.addEventListener('click', function () {
            // Copy to clipboard.
            DrupalTemplateHelper.copyValueToClipboard(this.value);
          });
          valuesListItem.appendChild(button);

          valuesList.appendChild(valuesListItem);
        }

        listItem.appendChild(valuesList);
        list.appendChild(listItem);
      }
    }

    $TEMPLATE_PANEL.innerHTML = '';
    $TEMPLATE_PANEL.appendChild(list);
  },

  // Copies a value to the clipboard.
  copyValueToClipboard: function copyValueToClipboard(text) {
    // Create a dummy textarea to hold the placeholder value.
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    // Select the text inside the textarea.
    textArea.select();

    // Attempt to copy to clipboard.
    try {
      document.execCommand('copy');
    } catch (error) {
      console.log(error);
    }

    // Remove the textarea.
    document.body.removeChild(textArea);
  },

  // Returns the function definition for a hook.
  getHookPreprocessFunctionForHook: function (hook) {
    return 'function THEMENAME_preprocess_' + hook + '(&$variables) { }';
  }
};

