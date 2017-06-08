HMRC screens
================

Browse screenshots of HMRC Services, organised by user scenario.

[http://hmrc.github.io/hmrc-screens/](http://hmrc.github.io/hmrc-screens/)

You can view user journeys for each service as an overview in detail and out of them or step through them in order.

## Running the app locally

The app is very simple. You can view screens locally just by opening the root folder's `index.html` in a browser. It works especially well in Chrome's presentation mode. Your mileage may vary in other browsers.

## How to contribute your screens

Adding screens is a great way for other people to see your user journeys and how you've solved a problem. It also helps us to identify design patterns in services and keep consistency of those patterns between services. 

Screenshots of production services are better than prototypes as they show us what's seen by our users. However, it's not always easy to screenshot these services if they require authentication.

Pull requests are the best way to contribute. You'll need to know how to use Git.

## Option 01

Using the command line tool you can create a service and add screenshots you have taken scenario by scenario. The prompts in the CLI are straightforward to follow, but they are described below.

### 1. Run the tool

1. Open your terminal and navigate to the root directory
2. Type `npm start`
3. Follow the prompts

You will be given a list of the services that are already in the app and the option to add a new service.

To add a new scenario to an existing service, select the name of the service from the list and hit enter. You will then be asked for the name of the scenario you want to add.

To add a new service select 'Create a new service' and hit enter. You will be asked for the name of the service, then the name of the scenario to add to it.

### 2. Add your images

Each service has it's own folder in [`/service`](https://github.com/hmrc/hmrc-screens/tree/gh-pages/service). Drop all your images into the scenario folder that was just created in the service's `images` directory.

Return to the command line and hit enter. Your screenshots will be renamed (to make them safe for the web) and ordered chronologically according to the date and time the files were created. This means that if you've captured the screens one after the other while navigating through a journey they will be in the correct order in the app.

#### Capturing screenshots

On OSX, [Paparazzi](https://derailer.org/paparazzi/) is the best way to capture screenshots. You can set the maximum and minimum widths for the screens (1024px wide is best), and it can capture images in batches.

[Nixon](https://github.com/joelanman/nixon) is a tool that allows you to automate screenshot capture using CasperJS or PhantomJS.

On Windows you can use the [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot-captur/alelhddbbhepgpmgidjdcjakblofbmce?hl=en) plugin for Chrome.

You can also use services like [BrowserStack](http://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for automated serverside screenshot capture.

## Future enhancements

We plan to add more functionality to the app in the future to make it even easier to take screenshots and add screens to the app. 

These enhancements are:

* add notes to each screen through the app's UI
* rearrange screens through the app's UI
* take screenshots through the app's UI
