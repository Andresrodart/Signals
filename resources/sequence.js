import * as sq from './seq';

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

	get conSequence(g){ //Convolucion
		res = sq.conSeq(this.sequence, this.lower, this.upper, g, g.lower, g.upper)
		let lower =  parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		})[0]);
		let upper = parseInt(Object.keys(res).sort((a, b) => {
			return parseInt(a) - parseInt(b);
		}).pop()); //Nuevo posicion
		return new Sequence(sq.toString(res, lower, upper))
	}

	add(other){ //#f(n) += f(n)
		if (typeof other === 'number'){ //Cuando es desplazamiento
			res = sq.desSeq(this.sequence, this.lower, this.upper, other)
			return Sequence(sq.toString(res, list(res)[0], list(res)[-1]))
		}
		l = Math.min(this.lower, other.lower)
		u = Math.max(this.upper, other.upper)
		res = sq.addSeqs(this.sequence, other.sequence, l, u)
		return new Sequence(sq.toString(res[0], res[1], res[2]))
	}

	static add(a, b){ //#f(n) += f(n)
		let res = null;
		if (typeof a === 'number'){ //Cuando es desplazamiento
			res = sq.desSeq(b.sequence, b.lower, b.upper, a);
		}else if (typeof b === 'number') //Cuando es desplazamiento
			res = sq.desSeq(a.sequence, a.lower, a.upper, b);
		
		if (res) return Sequence(sq.toString(res, parseInt(Object.keys(res).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			})[0]),  parseInt(Object.keys(res).sort((a, b) => {
				return parseInt(a) - parseInt(b);
			}).pop())));

		let l = Math.min(a.lower, b.lower)
		let u = Math.max(a.upper, b.upper)
		res = sq.addSeqs(a.sequence, b.sequence, l, u)
		res = new Sequence(sq.toString(res[0], res[1], res[2]))
	}
}