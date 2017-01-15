var NAVBAR_HEIGTH = 62;

var navbarItems = document.getElementsByClassName('navbar-item');
for (var i = 0; i < navbarItems.length; i++) {
	navbarItems[i].addEventListener('click', function(event){
		deleteActiveClass();

		if (Modernizr.classList) {
			this.classList.add('active');
		} else {
			this.className += ' active';
		}

		var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');
		if (sectionToGo.length > 1) {
			event.preventDefault();
			var goTo = sectionToGo[sectionToGo.length - 1];
			getElementByIdAndScroll(goTo);
		}
	});
}

function getElementByIdAndScroll(name) {
    var element;
    if (name == '') {
        element = document.getElementsByClassName('header')[0];
    } else {
        element = document.getElementById(name);
    }

    scrollToElement(element);
}

function scrollToElement(element) {
	var jump = parseInt(element.getBoundingClientRect().top * 0.3);
	document.body.scrollTop += jump;

	if(!element.lastJump || element.lastJump > Math.abs(jump)) {
		element.lastJump = Math.abs(jump);

		setTimeout(function() {
			scrollToElement(element);
		}, "60");
	} else {
		element.lastJump = null;
	}
}

function deleteActiveClass() {
	if (Modernizr.classList) {
		document.getElementsByClassName('navbar-item active')[0].classList.remove('active');
	} else {
		document.getElementsByClassName('navbar-item active')[0].className = 'navbar-item';
	}
}

var cumulativeOffset = function(element) {
	var top = 0;
	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while(element);

	return top;
};

var offsetQuienSoy = cumulativeOffset(document.getElementById('quien-soy')) - NAVBAR_HEIGTH;
var offsetEstudios = cumulativeOffset(document.getElementById('estudios')) - NAVBAR_HEIGTH;
var offsetExperiencia = cumulativeOffset(document.getElementById('experiencia')) - NAVBAR_HEIGTH;
var offsetSobreMi = cumulativeOffset(document.getElementById('sobre-mi')) - NAVBAR_HEIGTH;
var offsetContacto = cumulativeOffset(document.getElementById('contacto')) - NAVBAR_HEIGTH;

changeMenuStyle();

window.addEventListener('scroll', changeMenuStyle);

var currentSectionIndex;
function changeMenuStyle(event) {
	var sectionName = "";
	if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy) {
		updateHeaderClass(currentSectionIndex, 0);

		if(!currentSectionIndex || currentSectionIndex != 0) {
			currentSectionIndex = 0;
		} else {
			return false;
		}
		sectionName = "#";
	} else if(window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetEstudios) {
		updateHeaderClass(currentSectionIndex, 1);

		if(!currentSectionIndex || currentSectionIndex != 1) {
			currentSectionIndex = 1;
		} else {
			return false;
		}
		sectionName = "quien-soy";

	} else if (window.pageYOffset >= offsetEstudios && window.pageYOffset < offsetExperiencia) {
		updateHeaderClass(currentSectionIndex, 2);

		if(!currentSectionIndex || currentSectionIndex != 2) {
			currentSectionIndex = 2;
		} else {
			return false;
		}
		sectionName = "estudios";		 
	} else if (window.pageYOffset >= offsetExperiencia && window.pageYOffset < offsetSobreMi) {
		updateHeaderClass(currentSectionIndex, 3);

		if(!currentSectionIndex || currentSectionIndex != 3) {
			currentSectionIndex = 3;
		} else {
			return false;
		}
		sectionName = "experiencia";
	} else if (window.pageYOffset >= offsetSobreMi && window.pageYOffset < offsetContacto) {
		updateHeaderClass(currentSectionIndex, 4);

		if(!currentSectionIndex || currentSectionIndex != 4) {
			currentSectionIndex = 4;
		} else {
			return false;
		}
		sectionName = "sobre-mi";
	} else if (window.pageYOffset >= offsetContacto) {
		updateHeaderClass(currentSectionIndex, 5);

		if(!currentSectionIndex || currentSectionIndex != 5) {
			currentSectionIndex = 5;
		} else {
			return false;
		}
		sectionName = "contacto";
	}
	deleteActiveClass();
	addNewActiveClass(sectionName);
}

function addNewActiveClass (sectionName) {
	if(Modernizr.classList) {
		document.querySelector('a[href$="' + sectionName + '"]').parentNode.classList.add("active");
	} else {
		document.querySelector('a[href$="' + sectionName + '"]').parentNode.className += " active";
	}
}

function updateHeaderClass (currentSectionIndex, newSectionIndex) {
	if(currentSectionIndex != newSectionIndex) {
		var headerNavbar;
		if (newSectionIndex == 0) {
			headerNavbar = document.getElementsByClassName('header-navbar-fixed')[0];
			if(headerNavbar) {
				headerNavbar.classList.remove('header-navbar-fixed');
				headerNavbar.classList.add('header-navbar');
			}
		} else if(currentSectionIndex == 0) {
			headerNavbar = document.getElementsByClassName('header-navbar')[0];
			if(headerNavbar) {
				headerNavbar.classList.remove('header-navbar');
				headerNavbar.classList.add('header-navbar-fixed');				
			}
		} else if (currentSectionIndex == null && newSectionIndex > 0) {
			headerNavbar = document.getElementsByClassName('header-navbar')[0];
			if(headerNavbar) {
				headerNavbar.classList.remove('header-navbar');
				headerNavbar.classList.add('header-navbar-fixed');				
			}
		}
	}	
}








