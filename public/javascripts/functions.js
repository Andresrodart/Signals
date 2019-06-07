var data = {}
var url = '/';
var interType = 'S';

function showInput(){
	fade(document.getElementById('main'), document.getElementById('User'));
}
function showMicrophone(){
	fade(document.getElementById('main'), document.getElementById('Mic'));
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
	data['gnP'] = (document.getElementById('perioB').checked)? true:false;
	data['fnP'] = (document.getElementById('perioA').checked)? true:false;
}

function sendData() {
	fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers:{
		'Content-Type': 'application/json'
	}
	}).then(res => res.json())
	.catch(error => alert('Hubo un erro verifique que ingreso los datos necesarios de manera correcta'))
	.then(response => {
		var trace1 = {
			x: Object.keys(response.fn).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			y: Object.values(response.fn).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			mode: 'markers',
			name: 'fn',
			type: 'scatter'
		  };
		  
		  var trace2 = {
			x: Object.keys(response.gn).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			y: Object.values(response.gn).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			mode: 'markers',
			name: 'gn',
			type: 'scatter',
			marker: { size: 12 }
		  };
		  
		  var trace3 = {
			x: Object.keys(response.resS).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			y: Object.values(response.resS).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}),
			mode: 'markers',
			name: 'res',
			type: 'scatter',
			marker: { size: 12 }
		  };
		  
		  	var data = [trace1, trace2, trace3];
		  	var lay = {
				shapes: []
			  }
		for (let index = 0; index < trace1.x.length; index++) {
			lay.shapes.push({
				type: 'line',
				x0: trace1.x[index],
				y0: 0,
				x1: trace1.x[index],
				y1: trace1.y[index],
				line: {
					color: 'rgb(55, 128, 191)',
					width: 3
				}
				})
		}
		  
		for (let index = 0; index < trace2.x.length; index++) {
			lay.shapes.push({
				type: 'line',
				x0: trace2.x[index],
				y0: 0,
				x1: trace2.x[index],
				y1: trace2.y[index],
				line: {
					color: 'rgb(55, 128, 191)',
					width: 3
				}
				})
		}
		for (let index = 0; index < trace3.x.length; index++) {
			lay.shapes.push({
				type: 'line',
				x0: trace3.x[index],
				y0: 0,
				x1: trace3.x[index],
				y1: trace3.y[index],
				line: {
					color: 'rgb(55, 128, 191)',
					width: 3
				}
				})
		}
		  
		  Plotly.newPlot('plot', data, lay);
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

function startRecording(){
	navigator.mediaDevices.getUserMedia({ audio: true })
	.then(stream => {
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.start();

		const audioChunks = [];

		mediaRecorder.addEventListener("dataavailable", event => {
		audioChunks.push(event.data);
		});

		setTimeout(() => {
			mediaRecorder.stop();
			console.log(audioChunks);
		}, 3000);
	}).catch(err => console.log(error));
}