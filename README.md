HMRC screens
================

Browse screenshots of HMRC Services, organised by user scenario.

[http://hmrc.github.io/hmrc-screens/](http://hmrc.github.io/hmrc-screens/)

You can view different sets of screenshots for each service, zoom in and out of them or step through them in order.


## Running this app locally

The app is very simple. You can view screens locally if you need to. Just open the index.html file in the root folder. It works especially well in Chrome's presentation mode. Your mileage may vary in other browsers.

## How to contribute

Adding screens is a great way for other people to see how you've solved a problem and will allow us to keep consistency and identify design patterns in services. Production services are better than prototypes as they show us what s in production which is not always easy to see if services require authentication.

Pull requests are the best way to contribute. You'll need to know how to use Git.

## Option 01

Using the CLI you can create a service and add screenshots you have taken scenario by scenario. The prompts in the CLI are straightforward to follow, but they are described below.

### 1. Navigate to the root directory and type 'node index' and follow the prompts

You will be give a list of the services that are already in the app and an option to add a new service.

To add a new scenario to an existing service select the name of the service and hit enter. You will be asked for the name of the scenario.

To add a new service select 'Create a new service' and hit enter. You will be asked for the name of the service.

### 2. Add your images

Each service has it's own folder in '/service'. Drop all your images into the 'images/scenario' subfolder (1024px wide is best).

Return to the command line and hit enter. Your screenshots will be renamed and ordered in chronological order according to the date and time the files were created. This means that if you've captured the screens one after the other they will be in the correct order in the app.

### 3. Add a link to the service 

Add a link to your service in 'index.html' in the root of the app.

We are planning to do this step automatically in the future.

## Capturing screenshots

On OSX, [Paparazzi](https://derailer.org/paparazzi/) is the best way to capture screenshots. You can set the maximum and minimum widths for the screens, and can capture images in batches.

[Nixon](https://github.com/joelanman/nixon) is a tool that allows you to automate screenshot capture using CasperJS or PhantomJS.

On Windows you can use the [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot-captur/alelhddbbhepgpmgidjdcjakblofbmce?hl=en) plugin for Chrome.

You can also use services like [BrowserStack](http://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for automated serverside screenshot capture.

## Future enhancements

We plan to add more functionality to the app in the future to make it even easier to add screens to the app. 

These enhancements are:

* add notes to each screen in the UI of the app
* take screenshots through the app
* rearrange screens in the app 




