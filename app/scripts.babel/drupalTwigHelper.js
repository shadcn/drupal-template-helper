'use strict';

// Drupal Twig Helper.

// The comment node type.
var COMMENT_NODE_TYPE = 8;

// The Twig panel element.
var $TWIG_PANEL = document.getElementById('twig-panel');

// The error message to show when no template is found.
var TWIG_HELPER_ERROR_MESSAGE = 'No templates found.';

// Template helper info.
var TEMPLATE_HELPER_REGEX = {
  "current_template" : {
    "title" : "Current template",
    "regex" : "^BEGIN\\s?OUTPUT\\s?from\\s?\\'(.*)\\'$",
    "modifier" : "i",
  },
  "template_suggestions": {
    "title" : "Template suggestions",
    "regex" : "([\\*|x]\\s{1}\\S*)",
    "modifier" : "gmi",
  },
  "theme_hook": {
    "title" : "Hook",
    "regex" : "^THEME\\s?HOOK\\s?:\\s?\\'(.*)\\'$",
    "modifier" : "i",
  },
  "d7_theme_hook": {
    "title" : "Hook",
    "regex" : "^CALL\\:\\s?theme\\(\\'(.*)\\'\\)$",
    "modifier" : "i",
  }
};

// Drupal Twig Helper.
var DrupalTwigHelper = {

  // Return Theme debug comments for an element.
  getCommentsForElement: function (element) {
    var comments = [];

    // Loop through previous siblings until we hit <-- THEME DEBUG -->.
    // Assumming <-- THEME DEBUG --> is where the Twig helper comments starts.
    var prevSibling = element.previousSibling;
    while (!/\s+THEME DEBUG\s+/i.test(prevSibling.nodeValue)) {
      if (prevSibling.nodeType === 8) {
        comments.push(prevSibling.nodeValue.trim());
      }
      prevSibling = prevSibling.previousSibling;
    }

    return comments;
  },

  // Show Twig templates callback.
  showTwigTemplates: function () {
    chrome.devtools.inspectedWindow.eval("(" + DrupalTwigHelper.getCommentsForElement.toString() + ")($0)", function (result, exceptionInfo) {
      // Log message if error.
      if (typeof exceptionInfo !== 'undefined') {
        DrupalTwigHelper.log(TWIG_HELPER_ERROR_MESSAGE);
        return;
      }

      // Get templates from result and display.
      var templates = DrupalTwigHelper.getTemplatesFromComments(result);
      DrupalTwigHelper.logTemplates(templates);
    });
  },

  // Returns an array of templates from Twig helper comments.
  getTemplatesFromComments: function (comments) {
    var templates = [];

    for (var i in comments) {
      var comment = comments[i];
      templates.push(DrupalTwigHelper.parseComment(comment));
    }

    return templates;
  },

  // Parses a comment string into a renderable template object.
  parseComment: function (comment) {
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

  // Logs a message to the Twig panel.
  log: function (message) {
    $TWIG_PANEL.innerHTML = '<p class="message">' + message + '<p>';
  },

  logTemplates: function (templates) {
    var list = document.createElement('ul');

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
          var safeValue = value.replace(/([x|*]\s{1})/g, '');;

          // Highlight current template.
          var regex = new RegExp("(x\\s{1}\\S*)", "i");
          if (value.match(regex)) {
            valuesListItem.className = 'selected';
          }

          // Add code.
          var code = document.createElement('code');
          code.innerHTML = safeValue;
          valuesListItem.appendChild(code);

          // Create a copy button.
          var button = document.createElement('button');
          button.innerHTML = 'Copy';
          button.value = safeValue;
          button.addEventListener('click', function() {
            // Copy to clipboard.
            DrupalTwigHelper.copyValueToClipboard(this.value);
          });
          valuesListItem.appendChild(button);

          valuesList.appendChild(valuesListItem);
        }

        listItem.appendChild(valuesList);
        list.appendChild(listItem);
      }
    }

    $TWIG_PANEL.innerHTML = '';
    $TWIG_PANEL.appendChild(list);
  },

  // Copies a value to the clipboard.
  copyValueToClipboard: function (text) {
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
  }
}
