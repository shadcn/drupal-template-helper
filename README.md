# Drupal Template Helper
A Chrome DevTools extension for Drupal 8 and Drupal 7 templates: https://chrome.google.com/webstore/detail/ppiceaegogijpjodfpiimifhbnaifbnn

![drupal-template-helper](https://cloud.githubusercontent.com/assets/124599/14293486/d561f37e-fb7d-11e5-8ed0-952d520678a4.png)

## Installation
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

##### Step 3: Enable theme debug
* For Drupal 8, see Phil's article here: https://www.chapterthree.com/blog/drupal-8-theming-setting-theme-debugging
* For Drupal 7, see https://www.drupal.org/node/223440.

## Usage
Inspect an element using DevTools and click on **Templates** in the DevTools sidebar.

# License

The MIT License (MIT)

Copyright (c) 2015 Arshad Chummun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
