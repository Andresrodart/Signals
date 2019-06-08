var data = {}
var url = '/';
var interType = 'S';
var audio;
var sound, mySound;
var soundFile;
const readyToRecord = false;
var context;
  

function setup(){// create an audio in
	mic = new p5.AudioIn();
	// users must manually enable their browser microphone for recording to work properly!
	mic.start();
	// create a sound recorder
	recorder = new p5.SoundRecorder();
	// connect the mic to the recorder
	recorder.setInput(mic);
	// create an empty sound file that we will use to playback the recording
	soundFile = new p5.SoundFile();
}

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
			x: Object.keys(response.fn),
			y: Object.values(response.fn),
			mode: 'markers',
			name: 'fn',
			type: 'scatter'
		  };
		if(response.gn){
			var trace2 = {
				x: Object.keys(response.gn),
				y: Object.values(response.gn),
				mode: 'markers',
				name: 'gn',
				type: 'scatter',
				marker: { size: 12 }
			};	  
		}
		  
		  
		var trace3 = {
			x: Object.keys(response.resS),
			y: Object.values(response.resS),
			mode: 'markers',
			name: 'res',
			type: 'scatter',
			marker: { size: 12 }
		};
		if(response.gn)
			var data = [trace1, trace2, trace3];
		else
			var data = [trace1, trace3];
		var lay = {
			shapes: []
		}
		for (let index = 0; index < trace3.x.length; index++) {
			lay.shapes.push({
				type: 'line',
				x0: trace3.x[index],
				y0: 0,
				x1: trace3.x[index],
				y1: trace3.y[index],
				line: {
					color: 'rgb(255, 128, 191)',
					width: 3
				}
			})
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
		if(response.gn){
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
		}
		
		  
		Plotly.newPlot('plot', data, lay);
		console.log('Success:', response, data);
		document.getElementById('respuesta').innerHTML = 'Respuesta: ' + response.res
	});
}

function getSec(){
	data['fn'] = document.getElementById('fn').value;
	data['gn'] = document.getElementById('gn').value;
	data['gnP'] = (document.getElementById('perioB').checked)? true:false;
	data['fnP'] = (document.getElementById('perioA').checked)? true:false;
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

function diezMic() {
	// speed = constrain(.5, 0.01, 4);
	document.getElementById('playRecording').src = '../images/PlayU.svg'
	soundFile.rate(document.getElementById("diez").value);
	soundFile.play();
}

function interMic() {
	// speed = constrain(.5, 0.01, 4);
	document.getElementById('playRecording').src = '../images/PlayU.svg'
	soundFile.rate(document.getElementById("inter").value);
	soundFile.play();
}

function neqMic() {
	// speed = constrain(.5, 0.01, 4);
	document.getElementById('playRecording').src = '../images/PlayU.svg'
	soundFile.rate(1);
	soundFile.reverseBuffer();
	soundFile.play();
}

function startRecording(){
	context = getAudioContext()
	document.getElementById('startRecording').src = '../images/micButU.svg'
	document.getElementById('playRecording').src = '../images/PlayU.svg'
	context.resume().then(() => {
		recorder.record(soundFile, 5, ()=>{
			alert('Se acabo de grabar');
			document.getElementById('startRecording').src = '../images/micBut.svg';
			document.getElementById('playRecording').src = '../images/Play.svg';
		});
		console.log('Playback resumed successfully');
	  });
	console.log(soundFile)
	if(soundFile)
	  i = 0;
	else
		alert('No se puede grabar aun');
}

function playRecording() {
	soundFile.rate(1);
	soundFile.play();
	//audio.play();
}