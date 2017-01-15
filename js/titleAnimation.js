function addTitleAnimation(sectionName) {
	if(sectionName != "#") {
		var sectionOddTitle = document.querySelector('.' + sectionName + ' > .section-container > .section-odd-title');
		if (sectionOddTitle && !sectionOddTitle.classList.contains('section-title-animation')) {
			sectionOddTitle.classList.add('section-title-animation');
		}
		var sectionPairTitle = document.querySelector('.' + sectionName + ' > .section-container > .section-pair-title');
		if(sectionPairTitle && !sectionPairTitle.classList.contains('section-title-animation')) {
			sectionPairTitle.classList.add('section-title-animation');
		}
	}
}

var oQuienSoy = cumulativeOffset(document.getElementById('quien-soy'));
var oEstudios = cumulativeOffset(document.getElementById('estudios'));
var oExperiencia = cumulativeOffset(document.getElementById('experiencia'));
var oSobreMi = cumulativeOffset(document.getElementById('sobre-mi'));
var oContacto = cumulativeOffset(document.getElementById('contacto'));

window.addEventListener('scroll', changeTitle);

var indSection;
function changeTitle(event) {
	var sectionName = "";
	var myHeight = window.innerHeight;
	var downY = window.pageYOffset + myHeight;

	if (downY >= 0 && downY < oQuienSoy) {
		if(!indSection || indSection != 0) {
			indSection = 0;
		} else {
			return false;
		}
		sectionName = "#";
	} else if(downY >= oQuienSoy && downY < oEstudios) {
		if(!indSection || indSection != 1) {
			indSection = 1;
		} else {
			return false;
		}
		sectionName = "quien-soy";

	} else if (downY >= oEstudios && downY < oExperiencia) {
		if(!indSection || indSection != 2) {
			indSection = 2;
		} else {
			return false;
		}
		sectionName = "estudios";		 
	} else if (downY >= oExperiencia && downY < oSobreMi) {
		if(!indSection || indSection != 3) {
			indSection = 3;
		} else {
			return false;
		}
		sectionName = "experiencia";
	} else if (downY >= oSobreMi && downY < oContacto) {
		if(!indSection || indSection != 4) {
			indSection = 4;
		} else {
			return false;
		}
		sectionName = "sobre-mi";
	} else if (downY >= oContacto) {
		if(!indSection || indSection != 5) {
			indSection = 5;
		} else {
			return false;
		}
		sectionName = "contacto";
	}
	addTitleAnimation(sectionName);
}