//import defaultExport from './sequence';
const Sequence = require('./sequence')

sL = []; //Lista de Secuencias 
sN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

sL.push(new Sequence('{1 2 3 4 (5) 6 7 8 9}')); //#a = sl[0]
sL.push(new Sequence('{1 2 3 4 (-5) 6 7 8 9}')); //#b = sl[1]
sL.push(new Sequence('{-3 -4 (-5) -6 -7 -8}')) //#c = sl[2]
sL.push(new Sequence('{-1 -2 3 -4 (-5) -6 -7 0 -9}')) //#d = sl[3]
sL.push(new Sequence('{1 2 3 4 (-5) -6 -7 -8 -9}')) //#e = sl[4]
sL.push(new Sequence('{-1 -2 -3 -4 (-5)}')) //#f = sl[5]
sL.push(new Sequence('{0.75 -2 11 (10) 4 2 0 0 -1}')) //#g = sl[6]
sL.push(new Sequence('{3 (2) 1}')) //#h = sL[7]
sL.push(new Sequence('{10 (-0.5) 4 2 1 3}')) //#i = sL[8]
sL.push(new Sequence('{2 3 (1)}')) //#j = sL[9]

for (let index = 0; index < sL.length; index++) 
	console.log(sN[index] + ' = ' + sL[index].getString);
	
console.log('\n')
console.log("a - a = " + (sL[0].sub(sL[0])).getString);
console.log("a + b = " + (sL[0].add(sL[1])).getString)
console.log("a + c = " + (sL[0].add(sL[2])).getString)
console.log("a + d = " + (sL[0].add(sL[3])).getString)
console.log("a + e = " + (sL[0].add(sL[4])).getString)
console.log("a + f = " + (sL[0].add(sL[5])).getString)
console.log("a * f = " + (sL[0].mul(sL[5])).getString)
console.log("a * e = " + (sL[0].mul(sL[4])).getString)
console.log("a * -b = " + (sL[0].mul(sL[1].neq())).getString)
console.log("-a = " + (sL[0].neq()).getString)
console.log("a - 3 =  a(n - 3) = " + 	(sL[0].sub(  3)).getString)
console.log("a - 10 =  a(n - 10) = " + 	(sL[0].sub( 10)).getString)
console.log("a + 3 =  a(n + 3) = " + 	(sL[0].add(  3)).getString)
console.log("a + 10 =  a(n + 10) = " + 	(sL[0].add( 10)).getString)
console.log("a * 3 = " + 	(sL[0].mul(3)).getString)
console.log("a * -3 = " + 	(sL[0].mul(-3)).getString)
console.log("g,2 = g(n * 2) = " + (sL[6].deciSequence(2)).getString)
console.log("g,3 = g(n * 3) = " + (sL[6].deciSequence(3)).getString)
console.log("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'Z')).getString) //#A Cero
console.log("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'S')).getString) //#A Escalón
console.log("a,3 = a(n / 3) = " + (sL[0].inteSequence(3, 'Z')).getString) //#A Cero
console.log("a,3 = a(n / 3) = " + (sL[0].inteSequence(3, 'S')).getString) //#A Escalón
console.log("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'L')).getString) //#Lineal
console.log("h,3 = h(n / 3) = " + (sL[7].inteSequence(3, 'L')).getString) //#Lineal
console.log("i (x) j = " + (sL[8].conSequence(sL[9])).getString) //Convolución