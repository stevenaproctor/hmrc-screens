HMRC screens
================

Browse screenshots of HMRC Services, organised by user scenario.

[http://hmrc.github.io/hmrc-screens/](http://hmrc.github.io/hmrc-screens/)

You can view user journeys for each service as an overview, or select a screen for more detail and then step through them in order.

## Running the app locally

The app is very simple. You can view screens locally by opening the root `index.html` file in a browser. 
 
It works especially well in Chrome's presentation mode. Your experience may vary in other browsers.

## How to contribute your screens

Adding your screens is a great way to showcase the problems you've solved. It also allows us to ensure consistency across all our services and helps to identify design patterns. 
 
Screenshots of production services are better than prototypes as they show what’s currently seen by our users. Also, it’s not easy to screenshot a service that requires authentication.
 
Creating pull requests are the best way to contribute. So, you'll need to know how to use GitHub.

## Option 01

Using the command line tool (CLI), you can create a service and add screenshots you’ve taken, scenario by scenario. The prompts in the CLI are straightforward:

### 1. Run the tool

1. Open your terminal
2. Navigate to the root directory
2a. If this is the first time you've run the tool you'll have to run `npm install`
3. Type `npm start`
4. Follow the prompts

You’ll be given a list of the services that are already in the app and the option to add a new one.
 
To add a new scenario to an existing service
- Select the service from the list
- Hit enter
- Enter the name of the scenario
 
To add a new service:
- Select 'create a new service'
- Hit enter
- Enter the name of the service
- Enter the name of the scenario

### 2. Add your images

Each service has its own folder in [`/service`](https://github.com/hmrc/hmrc-screens/tree/gh-pages/service). Add all your images into the scenario folder in the service's images directory.
 
Return to the command line and hit enter. Your screenshots will be renamed (to make them web friendly) and ordered chronologically according to when they were created. This means that as you've captured the screens while navigating through a journey, they’ll be in the same order in the app.


#### Capturing screenshots

On OSX, [Paparazzi](https://derailer.org/paparazzi/) is the best way to capture screenshots. You can set the maximum and minimum widths for the screens (1024px wide is best), and it can capture images in batches.

[Nixon](https://github.com/joelanman/nixon) is a tool that allows you to automate screenshot capture using CasperJS or PhantomJS.

On Windows you can use the [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot-captur/alelhddbbhepgpmgidjdcjakblofbmce?hl=en) plugin for Chrome.

You can also use services like [BrowserStack](http://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for automated serverside screenshot capture.

## Future enhancements
We plan to add more functionality to the app to make it even easier to take screenshots and add them to the app. 
 
Through the UI, you’ll be able to:
- add notes to each screen 
- rearrange the screens 
- take screenshots 

