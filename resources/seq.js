function createSeq(strSeq) {
	let flag = false //Bandera que verifica si hay solo ceros
	let newSeq = {}
	let searched = strSeq.match(/\([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\)/) //Encuentra cero
	if (searched == -1){ //No se especifico cero, , regresa seq vacia
		newSeq[0] = 0
		return newSeq
	}
	zeroStr = searched[0] //Guarda cero
	preSeq = strSeq.slice(1, -1).split(' ') //Elimina llaves
	zeroIndex = preSeq.indexOf(zeroStr) //Desde donde se va a empezar la secuencia
	j = -zeroIndex

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

	let upper = -1
	Object.keys(newSeq).forEach(function(key) {
		upper = (parseInt(key) > upper)? parseInt(key):upper;
	});
	flag = true
	for (let i = upper; i < 0; index--){ //Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag && newSeq[i + ''] != '0')
			flag = false;
		if (flag)   
			delete newSeq[i];
	}
	return newSeq
}

function toString(preStr, l, u){
	strSeq = '['; //Abre Corchete
	for (let i = l; i < u + 1; i++) {
		if (i == 0){ //Si es cero, lo marca
			strSeq += ('(' + preStr[i] + ') ')
			continue
		}
		strSeq += preStr[i] + ' ' //Si no, solo lo agrega con espacio
	}
	strSeq = strSeq.slice(0, strSeq.length - 1) + ']' //Cierra corchete	
	return strSeq
}

function addSeqs(a, b, lower, upper){
	newSeq = {}
	flag = false
	tmp = 0

	//Suma uno a uno
	for (let i = lower; i < upper + 1; i++) {
		try {
			tmp = a[i] //Si existe valor en el dictionario, asgina a en la posición i
		}catch (error) {
			tmp = 0 //No exite en el dictionario, asigna 0
		}
		try {
			tmp += b[i] //Si existe valor en el dictionario, suma con b en la posición i
		} catch (error) {
			tmp += 0 //No exite en el dictionario, suma con 0
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
	let upper2 = 0;
	let lower2 = 0;
	Object.keys(newSeq).forEach(function(key) {
		upper2 = (parseInt(key) > upper2)? parseInt(key):upper2;
		lower2 = (parseInt(key) < lower2)? parseInt(key):lower2;
	});
	return [newSeq, lower2, upper2] //Regresa sequencia, posición inicial, posición final
}

function subSeqs(a, b, lower, upper){
	newSeq = {}
	flag = false
	tmp = 0

	//Suma uno a uno
	for (let i = lower; i < upper + 1; i++) {
		try {
			tmp = a[i] //Si existe valor en el dictionario, asgina a en la posición i
		}catch (error) {
			tmp = 0 //No exite en el dictionario, asigna 0
		}
		try {
			tmp -= b[i] //Si existe valor en el dictionario, suma con b en la posición i
		} catch (error) {
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
	let upper2 = 0;
	let lower2 = 0;
	Object.keys(newSeq).forEach(function(key) {
		upper2 = (parseInt(key) > upper2)? parseInt(key):upper2;
		lower2 = (parseInt(key) < lower2)? parseInt(key):lower2;
	});
	return [newSeq, lower2, upper2] //Regresa sequencia, posición inicial, posición final
}

function mulSeqs(a, b, lower, upper){ //Funciona igual que la suma
	newSeq = {}
	flag = false
	tmp = 0

	for (let i = lower; i < upper + 1; i++) {
		try {
			tmp = a[i]
		} catch (error) {
			tmp = 0
		}
		try {
			tmp *= b[i]
		} catch (error) {
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
	let upper2 = 0;
	let lower2 = 0;
	Object.keys(newSeq).forEach(function(key) {
		upper2 = (parseInt(key) > upper2)? parseInt(key):upper2;
		lower2 = (parseInt(key) < lower2)? parseInt(key):lower2;
	});
	return [newSeq, lower2, upper2]
}

function negSeq(a, lower, upper){ //Reflejo f(n) = f(-n)
	newSeq = {}
	j = upper
	for (let i = -upper; i < -(lower - 1); i++) {
		newSeq[i] = a[j]
		j -= 1
	}
	return newSeq
}

function ampSeq(a, lower, upper, C){ //Amplificación/Atenuación
	newSeq = {}
	for (let i = lower; i < upper + 1; i++)
		newSeq[i] = C * a[i];
	return newSeq
}

function desSeq(a, lower, upper, C){ //Desplazamiento
	newSeq = {} 
	aux = {}
	if (C == 0) //Si se desplaza 0, regresa la misma secuencia
		return a;
	//Se recorre la secuencia, aquí no contará cero agregados, i.e. cuando se desplaza más allá del tamaño
	for (let i = lower - C; i < upper + 1 - C; i++) {
		try {
			newSeq[i] = a[i + C] //Si existe la posición i + C, asignalo a la nueva secuencia
		} catch (error) {
			newSeq[i] = 0 //Si no, agrega cero
		}
	}
	l = 0 //Nuevo posicion inicial
	u = 0 //Nuevo posicion 
	Object.keys(newSeq).forEach(function(key) {
		u = (parseInt(key) > u)? parseInt(key):u;
		l = (parseInt(key) < l)? parseInt(key):l;
	});
	if (l > 0 && u > 0){ //Si creció de más de los positivos, agrega ceros faltantes
		for(let i = 0; i < l; i++) { //Los ceros se anexan al final
			newSeq[i] = 0;
		array.forEach(element => {
			
		});
		for j in sorted(newSeq): #Se acomdan (ordenan)
			aux[j] = newSeq[j]
		return aux
	}
	elif (l < 0 and u < 0): #Si creció de más de los negativos, agrega ceros faltantes
		for i in range(u + 1, 0 + 1):
			newSeq[i] = 0
	return newSeq
}
seq = createSeq('{1 2 3 4 (5) 6 7 8 9}')
se2 = createSeq('{1 2 3 4 (-5) 6 7 8 9}')
str = toString(seq, -4, 4)
resmul = ampSeq(seq, -4, 4, 2)
console.log(se2, str, resmul)