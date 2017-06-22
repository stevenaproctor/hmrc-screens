$(document).ready(function () {

  // toggle a scenario
  $(".image-set-title").click(function (event) {
    $(this).toggleClass('open')
    $(this).next().toggle();

    // Show toolbar if at least one set is open
    if ($('.image-set-title.open').length) {
      $('.toolbar').show();
    } else {
      $('.toolbar').hide();
    }

    // If all are open, make sure toggle is set to 'Close all'
    if ($('.image-set-title').length == $('.image-set-title.open').length) {
      console.log('all open!');
      $(".js-close-all").show();
      $(".js-open-all").hide();
    }

    // If all closed, make sure toggle is set to 'Open all'
    if (!$('.image-set-title.open').length) {
      console.log('all closed!');
      $(".js-close-all").hide();
      $(".js-open-all").show();
    }

  });

  // If there's only one image set, don't bother with all the toggle stuff
  if ($('.image-set-title').length == 1) {
    $('.image-set-title')[0].click();
    $('.all-toggle').hide();
  }

  // // Open all scenarios
  // $(".js-open-all").click(function (event) {
  //
  //   $('.image-set-images').show();
  //   $('.image-set-title').addClass('open');
  //   $(".js-close-all").show();
  //   $('.toolbar').show();
  //   $(this).hide();
  // });
  //
  // // Close all scenarios
  // $(".js-close-all").click(function (event) {
  //
  //   $('.image-set-images').hide();
  //   $('.image-set-title').removeClass('open');
  //   $(".js-open-all").show();
  //   $('.toolbar').hide();
  //   $(this).hide();
  // });

  // // Opens full-screen view of current image
  // $(".js-open-screen").click(function (event) {
  //   var screen = $(this).parents('.image')
  //   openScreen(screen);
  // });
  //
  // // Go to next image when in full-screen view
  // $(".js-next-screen").click(function (event) {
  //   var screen = $(this).parents('.image');
  //   openScreen(screen.next());
  // });
  //
  // // Go to previous image when in full-screen view
  // $(".js-prev-screen").click(function (event) {
  //   var screen = $(this).parents('.image');
  //   openScreen(screen.prev());
  // });
  //
  // // Close full-screen view
  // $(".js-close-screen").click(function (event) {
  //   var screen = $(this).parents('.image');
  //   closeScreen(screen);
  // });
  //
  //
  // // Handle keyboard
  // $(document).keydown(function (event) {
  //   // Find the currently zoomed image
  //   var screen = $('.zoomed-in');
  //   switch (event.which) {
  //     case 39:
  //       openScreen(screen.next());
  //       break; // Right
  //     case 37:
  //       openScreen(screen.prev());
  //       break; // Left
  //     case 27:
  //       closeScreen(screen);
  //       break;
  //   }
  // });

  // // Opens an image in full-screen view
  // function openScreen(screen) {
  //
  //   // Close any currently zoomed in images
  //   $('.zoomed-in').removeClass('zoomed-in');
  //
  //   // Scroll all images back to top
  //   $('.image-wrapper').scrollTop(0);
  //
  //   if (screen.length) {
  //     $('body').addClass('js-zoomed');
  //     screen.addClass('zoomed-in');
  //     // Stop rest of page from scrolling when scrolling the popup
  //     if ($(document).height() > $(window).height()) {
  //       var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
  //       $('html').addClass('noscroll').css('top', -scrollTop);
  //     }
  //   } else {
  //     closeScreen(screen)
  //   }
  //
  // };
  //
  //
  // // Closes an image in full-screen view
  // function closeScreen(screen) {
  //
  //   // Scroll all images back to top
  //   $('.image-wrapper').scrollTop(0);
  //
  //   screen.removeClass('zoomed-in');
  //   $('body').removeClass('js-zoomed');
  //
  //   // Re-enable scrolling of rest of page
  //   var scrollTop = parseInt($('html').css('top'));
  //   $('html').removeClass('noscroll');
  //   $('html,body').scrollTop(-scrollTop);
  //
  // };

});


//////////////////////////////////////////////////
/////////////////////////////////////////Vanilla JS

document.addEventListener("DOMContentLoaded", function () {

  var body = document.getElementsByTagName('body')[0];
  var fullHeightToggle = document.querySelector('.js-full-height');
  var rangeInput = document.getElementById('slider');
  var imageWrapper = document.getElementsByClassName('image-wrapper');
  var imageTitle = document.getElementsByClassName('image-title');
  var imageNote = document.getElementsByClassName('note');
  var toggleImageSets = document.querySelector('.all-toggle');
  var openAll = document.querySelector('.js-open-all');
  var closeAll = document.querySelector('.js-close-all');
  var toolBar = document.querySelector('.toolbar');
  var imagesSet = document.getElementsByClassName('image-set-images');
  var isToggleImageSetsOpen = false;
  var images = document.getElementsByClassName('image');

  //Zoom into screen
  for(var i = 0; i <= images.length - 1; i++){
    images[i].onclick = function(){
      this.classList.add('zoomed-in')
    }

    images[i].querySelector('.js-close-screen').onclick = function(e){
      e.stopPropagation()
      this.parentNode.parentNode.classList.remove('zoomed-in')
    }
  }

  //Close the screens and hide the toolbar onload
  for (var i = 0; i <= imagesSet.length - 1; i++) {
    imagesSet[i].style.display = 'none';
  }
  toolBar.style.display = 'none';

  //Toggle the view of all images

  toggleImageSets.onclick = function() {
    toggleAllImages()
  }

  function toggleAllImages() {

    isToggleImageSetsOpen = !isToggleImageSetsOpen;

    for (var i = 0; i <= imagesSet.length - 1; i++) {

      if (isToggleImageSetsOpen) {
        imagesSet[i].style.display = 'block';
        openAll.style.display = 'none';
        closeAll.style.display = 'inline';
        toolBar.style.display = 'block';
      } else {
        imagesSet[i].style.display = 'none';
        openAll.style.display = 'inline';
        closeAll.style.display = 'none';
        toolBar.style.display = 'none';
      }

    }

  }

  //Full height images toggle

  fullHeightToggle.onclick = function(){
    body.classList.toggle('full-height');
  }


  //Slider for zooming screens

  rangeInput.oninput = function(){
    updateSlider(rangeInput.value);
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
