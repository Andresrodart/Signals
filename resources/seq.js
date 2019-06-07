function createSeq(strSeq) {
	if(!strSeq)
		return -1 
	let flag = false //Bandera que verifica si hay solo ceros
	let newSeq = {}
	let searched = strSeq.match(/\([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\)/) //Encuentra cero
	if (searched == -1){ //No se especifico cero, , regresa seq vacia
		newSeq[0] = 0
		return newSeq;
	}
	zeroStr = searched[0] //Guarda cero
	preSeq = strSeq.slice(1, -1).split(' ') //Elimina llaves
	zeroIndex = preSeq.indexOf(zeroStr) //Desde donde se va a empezar la secuencia
	j = -zeroIndex;

	for (let index = 0; index < preSeq.length; index++) {
		const i = preSeq[index];
		if (i == '0' && !flag){ //Omite ceros que no se necesitan mostrar del lado negativo
			j += 1;
			continue;
		}

		if (i != '0') //Cuando estan entre un numero o no hay cero
			flag = true;

		if (flag){ //Se añaden a la secuencia
			if(j == 0){ //Se añade el cero
				newSeq[j] = parseFloat(i.slice(1,-1));
				j += 1;
				continue;
			}
			if(i[0] == '(' || i.charAt(i.length-1) == ')'){ //Encontró más de un cero, regresa seq vacia
				newSeq = {}
				newSeq[0] = 0
				return newSeq
			}
			newSeq[j] = parseFloat(i) //Se añade un elemento
			j += 1
		}
	}

	let upper = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion 
	flag = true
	for (let i = upper; i < 0; index--){ //Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag && newSeq[i + ''] != '0')
			flag = false;
		if (flag)   
			delete newSeq[i];
	}
	return newSeq
}

function toString(preStr, l, u, periodic){
	strSeq = '['; //Abre Corchete
	if (periodic)
		strSeq += '...';
	for (let i = l; i < u + 1; i++) {
		if (i == 0){ //Si es cero, lo marca
			strSeq += ('(' + Math.round(preStr[i] * 100) / 100 + ') ')
			continue;
		}
		strSeq += Math.round(preStr[i] * 100) / 100 + ' ' //Si no, solo lo agrega con espacio
	}
	strSeq = strSeq.slice(0, strSeq.length - 1) + ((periodic)? '...':'') + ']' //Cierra corchete	
	return strSeq
}

function addSeqs(a, b, lower, upper){
	newSeq = {};
	flag = false;
	tmp = 0;

	//Suma uno a uno
	for (let i = lower; i <= upper; i++) {
		if(a[i]) {
			tmp = a[i] //Si existe valor en el dictionario, asgina a en la posición i
		}else{
			tmp = 0 //No exite en el dictionario, asigna 0
		}
		if(b[i]) {
			tmp += b[i] //Si existe valor en el dictionario, suma con b en la posición i
		} else {
			tmp += 0 //No exite en el dictionario, suma con 0
		}
		if((!flag && tmp != 0) || i >= 0) //Omite ceros del lado negativo
			flag = true;
		if(flag) //Asgina valores
			newSeq[i] = tmp;
	}
	flag = true;
	for (let i = upper; i > 0; i--) { //Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag && newSeq[i] != 0)
			flag = false;
		if (flag)
			delete newSeq[i];
	}
	let lower2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	})[0]); //Nuevo posicion inicial
	let upper2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion
	return [newSeq, lower2, upper2] //Regresa sequencia, posición inicial, posición final
}

function subSeqs(a, b, lower, upper){
	newSeq = {}
	flag = false
	tmp = 0

	//Suma uno a uno
	for (let i = lower; i < upper + 1; i++) {
		if (a[i]) {
			tmp = a[i] //Si existe valor en el dictionario, asgina a en la posición i
		}else {
			tmp = 0 //No exite en el dictionario, asigna 0
		}
		if(b[i]) {
			tmp -= b[i] //Si existe valor en el dictionario, suma con b en la posición i
		} else {
			tmp -= 0 //No exite en el dictionario, suma con 0
		}
		if((!flag && tmp != 0) || i >= 0) //Omite ceros del lado negativo
			flag = true;
		if(flag) //Asgina valores
			newSeq[i] = tmp;
	}
	flag = true
	for (let i = upper; i > 0; i--) { //Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag && newSeq[i] != 0)
			flag = false;
		if (flag)
			delete newSeq[i];
	}
	let lower2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	})[0]); //Nuevo posicion inicial
	let upper2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion 
	return [newSeq, lower2, upper2] //Regresa sequencia, posición inicial, posición final
}

function mulSeqs(a, b, lower, upper){ //Funciona igual que la suma
	newSeq = {}
	flag = false
	tmp = 0

	for (let i = lower; i < upper + 1; i++) {
		if(a[i]) {
			tmp = a[i]
		} else {
			tmp = 0
		}
		if(b[i]) {
			tmp *= b[i]
		} else {
			tmp *= 0
		}

		if ((!flag && tmp != 0) || i >= 0)
			flag = true;
		if (flag)
			newSeq[i] = tmp;
	}
	flag = true
	for (let i = upper; i > 0; i--) {
		if (flag && newSeq[i] != 0)
			flag = false
		if (flag)
			delete newSeq[i]	
	}
	let lower2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	})[0]); //Nuevo posicion inicial
	let upper2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion 

	return [newSeq, lower2, upper2];
}

function negSeq(a, lower, upper){ //Reflejo f(n) = f(-n)
	newSeq = {};
	j = upper;
	for (let i = -upper; i < -(lower - 1); i++) {
		newSeq[i] = a[j];
		j -= 1;
	}
	return newSeq;
}

function ampSeq(a, lower, upper, C){ //Amplificación/Atenuación
	newSeq = {};
	for (let i = lower; i < upper + 1; i++)
		newSeq[i] = C * a[i];
	return newSeq;
}

function desSeq(a, lower, upper, C){ //Desplazamiento
	newSeq = {};
	aux = {};
	if (C == 0) //Si se desplaza 0, regresa la misma secuencia
		return a;
	//Se recorre la secuencia, aquí no contará cero agregados, i.e. cuando se desplaza más allá del tamaño
	for (let i = lower - C; i < upper + 1 - C; i++) {
		try {
			newSeq[i] = a[i + C]; //Si existe la posición i + C, asignalo a la nueva secuencia
		} catch (error) {
			newSeq[i] = 0; //Si no, agrega cero
		}
	}

	let l = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	})[0]); //Nuevo posicion inicial
	let u = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion 

	if (l > 0 && u > 0){//Si creció de más de los positivos, agrega ceros faltantes
		for(let i = 0; i < l; i++) //Los ceros se anexan al final
			newSeq[i] = 0;
		return newSeq;
	}
	else if (l < 0 && u < 0){ //Si creció de más de los negativos, agrega ceros faltantes
		for (let i = u + 1; i < 1; i++)
		newSeq[i] = 0;
	}
	return newSeq;
}

function deciSeq(a, lower, upper, K){ //Diezmación
	let newSeq = {};
	let flag = false;
	let tmp = 0, aux = K;
	
	if (K < 0) K = -K; //Si es una constante negativa, primero hazlo como si fuera positivo
	
	for(let i = lower; i <= upper; i++){
		if (a[i * K]) {
			tmp = a[i * K]; //f(n) = f(nK)
		} else {
			tmp = 0; //Lo mismo, pero si no se muestra en la secuencia original, f(n) = f(nK) = 0
		}

		if((tmp != 0 && !flag) || i == 0) //Si hay ceros innecesarios antes en la parte negativa
			flag = true;
		if (flag) //Valores validos (para mostrar nada más)
			newSeq[i] = tmp;
	}
	flag = true;
	for(let i = upper; i > 0; i--){ //Recorriendo de derecha a izquierda (hasta el indice cero), eliminando ceros que no mostrar
		try {
			if(newSeq[i] != 0)
				flag = false;
			if(flag)
				delete newSeq[i];
		} catch (error) {
			continue;
		}
	}
	
	let lower2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	})[0]); //Nuevo posicion inicial
	let upper2 = parseInt(Object.keys(newSeq).sort((a, b) => {
		return parseInt(a) - parseInt(b);
	}).pop()); //Nuevo posicion 
	
	if (aux < 0) //Si es una constante negativa, después regresa el refejo de la nueva secuencia
		return negSeq(newSeq, lower2, upper2);
		/*Esto es como si para f(n(-K)), donde K > 0
		primero se hace f(nK) = g(n), y después g(-n)*/
	return newSeq;
}

function inteSeq(a, lower, upper, K, iType) { // Interpolación
	let newSeq = {};
	let realIndex = lower; //Para "seguirle la pista" al elemento de la secuencia original
	let newLower = lower * K; //Nuevo indice inferior contando las (k - 1) muestras agregadas entre cada muestra
	let newUpper = upper * K; //Nuevo indice superior contando las (k - 1) muestras agregadas entre cada muestra
	for(let i = newLower; i < newUpper + K; i++)
		if(i % K) //Si es nuevo elemento
			newSeq[i] = getNewElement(iType, a, realIndex - 1, K, newSeq, i); //iType decide que tipo de interpolación
		else { //Si es elemento existente en la sequencia original
			newSeq[i] = a[realIndex];
			realIndex += 1;
		};
	console.log(newSeq)
	return newSeq;
}

function getNewElement(iType, a, realIndex, K, newSeq, i) {
	let tearedElement = 0;
	if (iType == 'Z') //Interpolación a Cero
		return 0;
	else if (iType == 'S') //Interpolación a Escalon
		return a[realIndex];
	else if (iType == 'L'){ //Interpolación Lineal
		if(!isNaN(Math.abs(a[realIndex] - a[realIndex + 1]) / K)){ //Si los elementos a tomar no son los ultimos
			tearedElement =  Math.abs(a[realIndex] - a[realIndex + 1]) / K; //Aplicando Formula: Ni +|i abs(Nf - Ni)/K
			if (a[realIndex] > a[realIndex + 1]) //Condicion de Nf < Ni
				return newSeq[i - 1]  - tearedElement;
			else //Condicion de Nf > Ni
				return newSeq[i - 1]  + tearedElement;
		}else{ //Si son los ultimos
			tearedElement =  Math.abs(a[realIndex]) / K;
			if (a[realIndex] > 0) //Condicion de Nf < Ni
				return newSeq[i - 1]  - tearedElement;
			else //Condicion de Nf > Ni
				return newSeq[i - 1]  + tearedElement;
		}
	}
}


function lenSeq(lower, upper) {
	return Math.abs(lower) + upper + 1;
}

function conSeq(a, lowerA, upperA, b, lowerB, upperB) {
	let newSeq = {}, listMul = [];
	let newLower = lowerA + lowerB; //Nuevo indice inferior (propiedad)
	let newUpper = upperA + upperB; //Nuevo indice superior (propiedad)

	for(let i = lowerB; i <= upperB; i++){ //Multiplicando cada elemento de b por todos los de a, b[i] * (a0, a1, ... aN)
		var tmp_ = [];
		Object.keys(a).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).forEach(Element => {
			tmp_.push(b[i] * a[Element]);
		})
		listMul.push(tmp_); //Se guarda en una lista de listas
	}
	//listMul = listMul.reverse()
	console.log(listMul)

	//Antes de sumar todas las listas, hay que recorrer cada lista n lugares correspondiente a su indice de b[i]
	let auxSize = listMul.length;
	for(let i = 0; i < auxSize; i++){//agregando espacios (ceros), como en el algoritmo de suma por columas
		for(let j = 0; j < i; j++) //Espacios de la derecha
		listMul[i].splice(0, 0, 0);
		for(let j = 0; j < auxSize - i - 1; j++) //Espacios de izquierda
		listMul[i].push(0);
	}

	let maxSumSize = 0;
	for(let index = 0; index < listMul.length; index++)
	maxSumSize = (maxSumSize < listMul[index].length)? listMul[index].length:maxSumSize;
	
	let auxSeq = new Array(maxSumSize).fill(0);
	
	for(let item = 0; item < listMul.length; item++)
	for(let index = 0; index < maxSumSize; index++)
	auxSeq[index] += listMul[item][index]; //#Sumar todas las listas
	
	let indexList = 0;
	for(let i = newLower; i <= newUpper; i++ ){//Agrego a la secuencia ya con indices
		newSeq[i] = auxSeq[indexList];
		indexList += 1;
	}
	return newSeq;
}

function SumConperiodica(seq, fn, gn) {
	let tem_ = null;
	let indexZero = Math.abs(seq.lower);
	let indexAux = 0, topIndex = Math.max(fn, gn);
	tem_ = new Array(topIndex).fill(0);
	for (let index = seq.lower; index <= seq.upper; index++) {
		tem_[indexAux++] += seq.sequence[index];
		indexAux = (indexAux >= topIndex)? 0: indexAux;
	}
	tem_[indexZero] = '(' + tem_[indexZero] + ')';
	console.log(tem_);

	return [('{' + tem_.join(' ') + '}'), seq.lower, topIndex];
}

function SumConCircular(seq, fn, gn) {
	let tem_ = null;
	let indexZero = Math.abs(seq.lower);
	let indexAux = 0, topIndex = Math.max(fn, gn);
	tem_ = new Array(topIndex).fill(0);
	for (let index = seq.lower; index <= seq.upper; index++) {
		tem_[indexAux++] += seq.sequence[index];
		indexAux = (indexAux >= topIndex)? 0: indexAux;
	}
	tem_[indexZero] = '(' + tem_[indexZero] + ')';
	console.log(tem_);
	return [('{' + tem_.join(' ') + '}'), seq.lower, topIndex];
}

module.exports = {
    createSeq: createSeq,
	toString: toString,
	addSeqs: addSeqs,
	subSeqs: subSeqs,
	mulSeqs: mulSeqs,
	negSeq: negSeq,
	ampSeq: ampSeq,
	desSeq: desSeq,
	deciSeq: deciSeq,
	inteSeq: inteSeq,
	lenSeq: lenSeq,
	conSeq: conSeq,
	SumConperiodica: SumConperiodica,
	SumConCircular: SumConCircular
};

// seq = createSeq('{1 2 3 4 (5) 6 7 8 9}');
// se2 = createSeq('{1 2 3 4 (-5) 6 7 8 9}');
// str = toString(seq, -4, 4);
// resmul = desSeq(seq, -4, 4, 10);
// console.log(seq, resmul);