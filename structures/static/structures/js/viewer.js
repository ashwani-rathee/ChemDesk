var preloader = document.querySelector('#loader');
var Home = document.querySelector(".HomeSection");
var info = document.querySelector(".infoSection");
var viewer = document.querySelector(".viewerSection");



window.setTimeout(function() {
  	preloader.style.opacity = '0';
}, 11);

window.setTimeout(function() {
    viewer.style.opacity = "1";
	preloader.style.display = "none";
}, 11);