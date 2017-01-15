$(document).ready(function() {
	var MAX_WORD_LENGTH = 150;
	var API_URL = 'http://localhost:8000/api/';

	var contacts = [];
	var publicContactsList = $('#publicContactsList');

	var nameInput = $('#name');
	var emailInput = $('#email');
	var contactTypes = $('input[name=conocido]');
	var conocidoOtrosDiv = $('#conocido_otros_input_div');
	var tlfInput = $('#telefono');
	var mensajeTextArea = $('#mensaje');

	var loader = $('.loader');

	var drawPublicContacts = function () {
		publicContactsList.empty();

		if (contacts.length == 0) {
			publicContactsList.append('<li class="contact-item">No hay mensajes públicos</li>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < contacts.length; i++) {
				/*contentToAdd += "<li class='task-item'>" + tasks[i].name + "<button class='deleteTask' data-task-id='" + tasks[i].id + "'>Eliminar</button></li>";*/
				contentToAdd += '<li class="contact-item"><p class="contact-item-name">' + contacts[i].name + " - " + contacts[i].email + '</p><p>' + contacts[i].message + '</p></li>';
			}
			publicContactsList.append(contentToAdd);
		}
	};

	var createPublicContact = function (name, email, message) {
		var success = function(data) {
			nameInput.val('');
			emailInput.val('');
			tlfInput.val('');
			mensajeTextArea.val('');
			$('#conocido_otros_input').val('');
			contacts.push(data);
			drawPublicContacts();
		};

		var data = {
			'name': name,
			'email': email,
			'message': message
		};

		$.ajax({
			type: "POST",
			url: API_URL + "contacts",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando el contacto público.", error);
		});
	}

	var getPublicContacts = function () {
		var success = function(data) {
			contacts = data;
			drawPublicContacts();
		}

		var error = function(error) {
			console.error("Error cargando contactos públicos.", error);
		} 

		var complete = function(object, textStatus) {
			loader.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		var beforeSend = function() {
			console.log("Before send");
			loader.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "contacts",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	$('#sendBtn').on("click", function(event){
		if ($('input[name=msg_type]:checked').val() == "Publico") {
			var name = nameInput.val();
			var email = emailInput.val();
			var message = mensajeTextArea.val();
			var telephone = tlfInput.val();
			var emailValid = validateRegExpression(email, "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
			var telephoneValid = validateRegExpression(telephone, "[0-9]{9}")
			if (name != '' && emailValid && (telephone =='' || telephoneValid) && message != '') {
				event.preventDefault();
				createPublicContact(name, email, message);
			}
		}
	});

	function validateRegExpression(value, expression) {
		var regExp = new RegExp(expression);
		if(regExp.test(value))
			return true;
  		else 
  			return false; 
	}


	setTimeout(function() {
		getPublicContacts();
	}, 2);


	contactTypes.on('click', function(event) {
		if (this.value == 'Otros') {
			conocidoOtrosDiv.removeClass('conocido_otros_input_div_visible_hidden');
			conocidoOtrosDiv.addClass('conocido_otros_input_div_visible');
		} else {
			conocidoOtrosDiv.removeClass('conocido_otros_input_div_visible');
			conocidoOtrosDiv.addClass('conocido_otros_input_div_hidden');
		}
	});

	mensajeTextArea.on('keyup', function(event) {
		var mesageSplit = this.value.split(" ");
		if (mesageSplit.length>MAX_WORD_LENGTH) {
			this.value = this.value.substring(0, this.value.lastIndexOf(" "));
			alert("Has llegado al número máximo de palabras " + MAX_WORD_LENGTH);
		}
	});
});