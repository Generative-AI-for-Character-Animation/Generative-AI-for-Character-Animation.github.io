window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + "/" + String(i).padStart(6, "0") + ".jpg";
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () {
    return false;
  };
  image.oncontextmenu = function () {
    return false;
  };
  $("#interpolation-image-wrapper").empty().append(image);
}

document.addEventListener("DOMContentLoaded", function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Initialize carousel if it exists
  if (document.querySelector(".carousel")) {
    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach(".carousel", options);

    // Loop on each carousel initialized
    for (var i = 0; i < carousels.length; i++) {
      // Add listener to event
      carousels[i].on("before:show", (state) => {
        console.log(state);
      });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector("#my-element");
    if (element && element.bulmaCarousel) {
      // bulmaCarousel instance is available as element.bulmaCarousel
      element.bulmaCarousel.on("before-show", function (state) {
        console.log(state);
      });
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll(".smooth-scroll").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = document.querySelector(".navbar").offsetHeight;

        window.scrollTo({
          top: targetElement.offsetTop - navHeight,
          behavior: "smooth",
        });

        // Update URL
        history.pushState(null, null, targetId);
      }
    });
  });

  // Navbar transparency control on scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
      }
    });
  }

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 150,
    });
  }

  // Handle hash links on page load
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash);

    if (targetElement) {
      setTimeout(function () {
        const navHeight = document.querySelector(".navbar").offsetHeight;

        window.scrollTo({
          top: targetElement.offsetTop - navHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
  preloadInterpolationImages();

  $("#interpolation-slider").on("input", function (event) {
    setInterpolationImage(this.value);
  });
  setInterpolationImage(0);
  $("#interpolation-slider").prop("max", NUM_INTERP_FRAMES - 1);

  bulmaSlider.attach();
});
