HMRC screens
================

Browse screenshots of Agent Services, organised by user scenario.

[http://hmrc.github.io/hmrc-screens/](http://hmrc.github.io/hmrc-screens/)

You can view different sets of screenshots for each service, zoom in and out of them or step through them in order.


## Running this app locally

The app is very simple and doesn't require anything to be installed or run in a terminal. Just open the index.html file in the root folder. It works especially well in Chrome's presentation mode. Your mileage may vary in other browsers.

### Capturing screenshots

On OSX, [Paparazzi](https://derailer.org/paparazzi/) is the best way to capture screenshots. You can set the maximum and minimum widths for the screens, and can capture images in batches.

[Nixon](https://github.com/joelanman/nixon) is a tool that allows you to automate screenshot capture using CasperJS or PhantomJS.

On Windows you can use the [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot-captur/alelhddbbhepgpmgidjdcjakblofbmce?hl=en) plugin for Chrome.

You can also use services like [BrowserStack](http://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for automated serverside screenshot capture.

## How to contribute

If you work on one of the exemplars and want to add or update screenshots of it please go ahead, you'd be doing us all a big favour. Pull requests are the best way. You'll need to know how to use Git and how to edit very simple data files.

## Option 01

### 1. Add your images

Each service has it's own folder in '/service'. Drop all your images into the 'images' subfolder (1024px wide is best).

### 2. Update the data file

Edit the data.js file in your numbered exemplar folder. It contains a few examples so you can see how the data should be structured.

### 3. Update the index file

Once you're done, don't forget to add a link to your service from the 'index.html' file in the root of this repository (not the one in your service folder).

## Option 2

## Build the JSON file dynamically 

For this to work you will have to have all of the screenshots in a folder and they will need to be named correctly. To do this you can use the [Automator workflow](save-files-in-order.workflow). The woerkflow makes filenames web friendly, replaces spaces with `-` and sorts the files according to the date and time they were created. Giving you a logical journey providing you captured them in order in the same session.

### 1. Navigate to the root directory and type 'node index.js' and follow the prompts
### 2. Enter your service name
### 3. Enter your service title
### 4. Enter the new folder name
### 5. Paste your images in the new folder and type 'go'

You should have a new JSON file called 'data.js' in your new folder so now navigate to the html file and you should have everything populated.




