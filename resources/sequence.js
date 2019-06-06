//import * as sq from './seq';
const sq = require('./seq')

class Sequence {
	constructor(string) {
		this.sequence = sq.createSeq(string);
		this.lower =  parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]);
		this.upper = parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
	}

	get getSequence(){
		return this.sequence
	}

	get getString(){
		return sq.toString(this.sequence, this.lower, this.upper)
	}

	get getLength(){
		return lenSeq(this.lower, this.upper) //(abs(this.lower) + this.upper + 1)
	}
	
	conSequence(g){ //Convolucion
		let res = sq.conSeq(this.sequence, this.lower, this.upper, g.sequence, g.lower, g.upper);
		return new Sequence(sq.toString(res, this.getLower(res), this.getUpper(res)))
	}
	
	deciSequence(K){ //#Diezmación
		let res = sq.deciSeq(this.sequence, this.lower, this.upper, K);
		let lower =  parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]);
		let upper = parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
		return new Sequence(sq.toString(res, lower, upper));
	}
	
	inteSequence(K, inteType){ //#Interpolación
		let res = sq.inteSeq(this.sequence, this.lower, this.upper, K, inteType)
		let lower =  parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]);
		let upper = parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
		return new Sequence(sq.toString(res, lower, upper));
	} 

	add(other){ //#f(n) += f(n)
		if (typeof other === 'number'){ //Cuando es desplazamiento
			let res = sq.desSeq(this.sequence, this.lower, this.upper, other);
			return new Sequence(sq.toString(res, this.getLower(res), this.getUpper(res)))
		}
		let l = Math.min(this.lower, other.lower)
		let u = Math.max(this.upper, other.upper)
		let res = sq.addSeqs(this.sequence, other.sequence, l, u)
		return new Sequence(sq.toString(res[0], res[1], res[2]))
	}

	sub(other){ //f(n) - g(n) ó f(n - C)
		if (typeof other === 'number'){ //Cuando es desplazamiento
			let res = sq.desSeq(this.sequence, this.lower, this.upper, -other);
			return new Sequence(sq.toString(res, this.getLower(res), this.getUpper(res)));
		} 
		let l = Math.min(this.lower, other.lower)
		let u = Math.max(this.upper, other.upper)
		let res = sq.subSeqs(this.sequence, other.sequence, l, u);
		return new Sequence(sq.toString(res[0], res[1], res[2]));
	}

	mul(other){ //f(n) · g(n) ó f(n) · C
		if (typeof other === 'number'){ //#Cuando es amplificació o atenuación
			let res = sq.ampSeq(this.sequence, this.lower, this.upper, other);
			return new Sequence(sq.toString(res, this.getLower(res), this.getUpper(res)));
		}

		let l = Math.min(this.lower, other.lower)
		let	u = Math.max(this.upper, other.upper)
		let res = sq.mulSeqs(this.sequence, other.sequence, l, u)
		return new Sequence(sq.toString(res[0], res[1], res[2]))
	}

	neq(){ // #f(-n)
		let res = sq.negSeq(this.sequence, this.lower, this.upper)
		return new Sequence(sq.toString(res, this.getLower(res), this.getUpper(res)));
	}

	getUpper(a){
		if (a) {
			return parseInt(Object.keys(a).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}).pop()); //Nuevo posicion
		}

		return parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
	}

	getLower(a){
		if (a) {
			return parseInt(Object.keys(a).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			})[0]); //Nuevo posicion
		}

		return parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]); //Nuevo posicion
	}

	static add(a, b){ //#f(n) += f(n)
		let res = null;
		if (typeof a === 'number'){ //Cuando es desplazamiento
			res = sq.desSeq(b.sequence, b.lower, b.upper, a);
		}else if (typeof b === 'number') //Cuando es desplazamiento
			res = sq.desSeq(a.sequence, a.lower, a.upper, b);
		
		if (res) return new Sequence(sq.toString(res, parseInt(Object.keys(res).sort((a, b) => {
				return parseInt(a)  - parseInt(b);
			})[0]),  parseInt(Object.keys(res).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}).pop())));

		let l = Math.min(a.lower, b.lower)
		let u = Math.max(a.upper, b.upper)
		res = sq.addSeqs(a.sequence, b.sequence, l, u)
		res = new Sequence(sq.toString(res[0], res[1], res[2]))
	}

	static getUpper(a){
		if (a) {
			return parseInt(Object.keys(a).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}).pop()); //Nuevo posicion
		}

		return parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
	}

	static getLower(a){
		if (a) {
			return parseInt(Object.keys(a).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			})[0]); //Nuevo posicion
		}

		return parseInt(Object.keys(this.sequence).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]); //Nuevo posicion
	}
}

module.exports = Sequence;