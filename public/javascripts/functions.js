var data = {}
var url = '/';
var interType = 'S';

function showInput(){
	fade(document.getElementById('main'), document.getElementById('User'));
}

function fade(element, element2Unfade) {
	var op = 1;  // initial opacity
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			element.style.display = 'none';
			unfade(element2Unfade);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 50);
}

function unfade(element) {
	var op = 0.1;  // initial opacity
	element.style.display = 'block';
	var timer = setInterval(function () {
		if (op >= 1){
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op += op * 0.1;
	}, 10);
}

function typeInter() {
	let radios = document.getElementsByName('group1');
	for (let i = 0, length = radios.length; i < length; i++){
		if (radios[i].checked){
			// do whatever you want with the checked radio
			interType = (radios[i].value);
			// only one radio can be logically checked, don't check the rest
			break;
		}
	}
}

function getSec(){
	data['fn'] = document.getElementById('fn').value;
	data['gn'] = document.getElementById('gn').value;
}

function sendData() {
	fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers:{
		'Content-Type': 'application/json'
	}
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => {
		console.log('Success:', response);
		document.getElementById('respuesta').innerHTML = 'Respuesta: ' + response.res
	});
}

function suma(){
	getSec();
	data['type'] = 'suma';
	sendData();
}

function resta(){
	getSec();
	data['type'] = 'resta';
	sendData();
}

function mul(){
	getSec();
	data['type'] = 'mul';
	sendData();
}

function inter(){
	getSec();
	if (document.getElementById('fnSelector').checked)
		data['fn'] = document.getElementById('gn').value;
	data['gn'] = parseInt(document.getElementById('k').value);
	data['type'] = 'inter';
	data['inter'] = interType;
	sendData();
}

function diez(){
	getSec();
	if (document.getElementById('fnSelector').checked)
		data['fn'] = document.getElementById('gn').value;
	data['gn'] = parseInt(document.getElementById('k').value);
	data['type'] = 'desmi';
	sendData();
}

function convol(){
	getSec();
	data['type'] = 'convo';
	let periods = (document.getElementById('perioB').checked)? 1:0;
	periods += (document.getElementById('perioA').checked)? 1:0;
	data['numPeriodics'] = periods
	sendData();
}

function ampl(){
	getSec();
	if (document.getElementById('fnSelector').checked)
		data['fn'] = document.getElementById('gn').value;
	data['gn'] = parseInt(document.getElementById('k').value);
	data['type'] = 'ampl';
	sendData();
}

function despl(){
	getSec();
	if (document.getElementById('fnSelector').checked)
		data['fn'] = document.getElementById('gn').value;
	data['gn'] = parseInt(document.getElementById('k').value);
	data['type'] = 'despl';
	sendData();
}

function neq(){
	getSec();
	if (document.getElementById('fnSelector').checked)
		data['fn'] = document.getElementById('gn').value;
	data['gn'] = parseInt(document.getElementById('k').value);
	data['type'] = 'neq';
	sendData();
}