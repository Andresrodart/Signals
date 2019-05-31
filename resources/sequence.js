import * as sq from './seq';

class Sequence {
	constructor(string) {
		this.setSequence(sq.createSeq(string));
		this.setLimits();
	}
}
  