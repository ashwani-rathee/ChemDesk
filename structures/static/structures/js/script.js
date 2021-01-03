var preloader = document.querySelector('#loader');
var infoSec = document.querySelector(".getInfo");
var bStart = document.querySelector(".beforeStart");
var aStart = document.querySelector(".afterStart");
var displaySec = document.querySelector(".displayInfo");
// var fixArrow = document.querySelector(".fixArrow");

window.setTimeout(function() {
  	preloader.style.opacity = '0';
}, 1500);//2500

window.setTimeout(function() {
	bStart.style.opacity = '1';
	preloader.style.display = "none";
}, 2000);//3000

function getSecondView(){
	bStart.style.opacity = "0";
	setTimeout(function(){
		bStart.style.display = "none";
		infoSec.style.width = "50%";
		displaySec.style.display = "block";
		aStart.style.display = "block";
		// fixArrow.style.display = "block";
		document.querySelector('.HomeSection').style.background = 'none';
	}, 1000);
	setTimeout(function(){
		aStart.style.opacity = "1";
		// fixArrow.style.opacity = "1";
	}, 1400);
    // document.querySelector("#upfile").click();
    // document.querySelector(".hideBtn input").textContent = `${document.querySelector(".hideBtn input").value}`;
}

function getFile(){
    document.querySelector("#upfile").click();
}

document.querySelector("#upfile").addEventListener("change", function() {
	let str = this.value;
	if(str == ""){
		document.querySelector(".fileName").textContent = `No file chosen`;
	}
	else{
	let imgStr = str.slice(str.lastIndexOf("\\")+1);
	document.querySelector(".fileName").textContent = `${imgStr}`;
	}
});

document.querySelector("#submit").addEventListener("click", function(){

});