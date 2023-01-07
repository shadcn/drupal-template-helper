# Drupal Template Helper
A Chrome DevTools extension for Drupal 8, Drupal 7 and Backdrop CMS templates: https://chrome.google.com/webstore/detail/ppiceaegogijpjodfpiimifhbnaifbnn

![drupal-template-helper](https://cloud.githubusercontent.com/assets/124599/14293486/d561f37e-fb7d-11e5-8ed0-952d520678a4.png)

## Installation

**The Chrome Web Store made some changes to their policies. I haven't had time to re-upload this extension.**

**For now, you can download it from GitHub and load it as an unpacked extension on Chrome.**

**1. Download https://github.com/arshad/drupal-template-helper/archive/master.zip**
**2. Go to `chrome://extensions` in Chrome.**
**3. Click on "Load unpacked".**

##### Step 1: Install and configure.
1. Download and install the Drupal Template Helper extension for Chrome.
2. Click on the extension icon. 
3. Click on Options under Drupal Template Helper.
4. Add the urls for sites to enable the extension. Example: `http://drupal.dev, http://www.drupal.dev`.
5. Save.

##### Step 2: Enable Chrome Experimental APIs.
1. Go to chrome://flags/#enable-devtools-experiments, find **Experimental Extension APIs** and **Developer Tools experiments**, click the "Enable" links, and restart Chrome.
2. Open DevTools and click on Settings.
3. Find the **Experiments** tab and enable **Allow custom UI themes**. See screenshot below. Don't forget to restart Chrome again.

![drupal-template-devtools-theme-ui](https://cloud.githubusercontent.com/assets/124599/14293054/e6350e72-fb7b-11e5-973a-31794db51e4d.png)

Note: If you want to hide the Twig comments, uncheck **Show HTML comments** under **Preferences**.

![drupal-template-devtools-preferences](https://cloud.githubusercontent.com/assets/124599/21719927/b5c16cb2-d439-11e6-8cc7-a84192aa822a.png)

##### Step 3: Enable theme debug
* For Drupal 8, see Phil's article here: https://www.chapterthree.com/blog/drupal-8-theming-setting-theme-debugging
* For Drupal 7, see https://www.drupal.org/node/223440.

## Usage
Inspect an element using DevTools and click on **Templates** in the DevTools sidebar.

