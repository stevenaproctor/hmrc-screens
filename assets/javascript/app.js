var isAnyScenarioOpen = false;

document.addEventListener("DOMContentLoaded", function () {

  var body = document.getElementsByTagName('body')[0];
  var fullHeightToggle = document.querySelector('.js-full-height');
  var rangeInput = document.getElementById('slider');
  var imageWrapper = document.getElementsByClassName('image-wrapper');
  var imageTitle = document.getElementsByClassName('image-title');
  var imageNote = document.getElementsByClassName('note');
  var allToggle = document.querySelector('.all-toggle')
  var openAll = document.querySelector('.js-open-all');
  var closeAll = document.querySelector('.js-close-all');
  var toolBar = document.querySelector('.toolbar');
  var images = document.getElementsByClassName('image');
  var imagesSet = document.getElementsByClassName('image-set-images');
  var imageSetTitles = document.getElementsByClassName('image-set-title');


  function scenarioOpened() {
    isAnyScenarioOpen = true;
    openAll.style.display = 'none';
    closeAll.style.display = 'inline';
    toolBar.style.display = 'block';
  }

  function allScenariosClosed() {
    isAnyScenarioOpen = false;
    //Hide toolbar
    openAll.style.display = 'inline';
    closeAll.style.display = 'none';
    toolBar.style.display = 'none';

  }

  function closeScenario(scenarioElement) {

    scenarioElement.nextElementSibling.style.display = 'none';

    if (!areImageSetsOpen()) {
      allScenariosClosed();
    }
  }

  function openScenario(scenarioElement) {
    scenarioElement.nextElementSibling.style.display = 'block';
    scenarioOpened();
  }

  function toggleScenario(scenarioElement) {
    if (scenarioElement.nextElementSibling.style.display === 'none') {
      openScenario(scenarioElement);
    } else {
      closeScenario(scenarioElement);
    }
  }

  function loopAllImages() {

    for (var i = 0; i <= images.length - 1; i++) {

      images[i].onclick = function () {
        this.classList.add('zoomed-in');
      }

      //Add data attributes to the images
      images[i].setAttribute('data-number', i.toString());

      //Get all next and previous buttons and call functions
      function changeScreen(btnControl, forwards) {
        images[i].querySelector(btnControl).onclick = function (e) {
          e.stopPropagation()
          var currentImage = this.parentNode.parentNode;
          currentImage.classList.remove('zoomed-in');

          if (forwards) {
            moveScreenForwards(currentImage)
          } else {
            moveScreenBackwards(currentImage)
          }
        }
      }

      function moveScreenForwards(currentImage) {
        var nextImage = currentImage.nextElementSibling;

        if (nextImage) {
          nextImage.classList.add('zoomed-in');
        }

      }

      function moveScreenBackwards(currentImage) {
        var previousImage = currentImage.previousElementSibling;

        if (previousImage) {
          previousImage.classList.add('zoomed-in');
        }
      }


      changeScreen('.js-next-screen', true);
      changeScreen('.js-prev-screen');

      //Close the screens
      images[i].querySelector('.js-close-screen').onclick = function (e) {
        e.stopPropagation();
        var currentImage = this.parentNode.parentNode;
        currentImage.classList.remove('zoomed-in');
      }
    }
  }

  function loopImageSets() {
    //Close the screens and hide the toolbar onload
    for (var i = 0; i <= imagesSet.length - 1; i++) {
      imagesSet[i].style.display = 'none';
    }
  }

  function loopImageSetTitles() {
    //Close the screens and hide the toolbar onload
    for (var i = 0; i <= imageSetTitles.length - 1; i++) {
      imageSetTitles[i].onclick = function () {
        toggleScenario(this);
      }
    }
  }

  function updateSlider(slideAmount) {

    for (var i = 0; i <= imageWrapper.length - 1; i++) {
      imageWrapper[i].style['font-size'] = slideAmount + '%';

      // Allow v-scroll if zoom is over 100%
      if (slideAmount > 100) {
        imageWrapper[i].classList.add('scrollable');
      } else if (slideAmount <= 100) {
        imageWrapper[i].classList.remove('scrollable');
      }

      // Hide captions if zoom is less than 50%
      if (slideAmount > 50) {
        imageTitle[i].classList.remove('hidden');
      } else if (slideAmount <= 50) {
        imageTitle[i].classList.add('hidden');
      }

      // Hide captions if zoom is less than 50%
      if (slideAmount > 300) {
        imageNote[i].classList.add('visible');
      } else if (slideAmount <= 300) {
        imageNote[i].classList.remove('visible');
      }
    }

  }

  function areImageSetsOpen() {

    for (var i = 0; i <= imagesSet.length - 1; i++) {
      if (imagesSet[i].style.display === 'block') {
        return true
      }
    }
    return false
  }


  //Toggle the image sets
  allToggle.onclick = function () {

    if (isAnyScenarioOpen) {

      var toggleScenario = closeScenario;

    } else {

      toggleScenario = openScenario;
    }

    for (var i = 0; i <= imageSetTitles.length - 1; i++) {
      toggleScenario(imageSetTitles[i]);
    }

  }


//Full height images toggle

  fullHeightToggle.onclick = function () {
    body.classList.toggle('full-height');
  }

//Slider for zooming screens

  rangeInput.oninput = function () {
    updateSlider(rangeInput.value);
  }

//Run functions
  loopAllImages();
  loopImageSets();
  loopImageSetTitles();
});

Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

var template = document.getElementById('template').innerHTML


function applyData(data) {
  document.getElementById('content').innerHTML = Handlebars.compile(template)(data);
}

applyData(data);
