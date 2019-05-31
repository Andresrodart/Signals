import seq as sq

class Sequence:
	def __init__(self, string):
		self.setSequence(sq.createSeq(string))
		self.setLimits()
		
	def setLimits(self):
		self.lower = list(self.sequence)[0]
		self.upper = list(self.sequence)[-1]

	def setSequence(self, seq):
		self.sequence = seq

	def getSequence(self):
		return self.sequence

	def getString(self):
		return sq.toString(self.sequence, self.lower, self.upper)

	def conSequence(self, g): #Convolucion
		res = sq.conSeq(self.sequence, self.lower, self.upper, g, g.lower, g.upper)
		return Sequence(sq.toString(res, list(res)[0], list(res)[-1]))

	def __add__(self, other): #f(n) + g(n) ó f(n + C)
		if (type(other) == type(int())): #Cuando es desplazamiento
			res = sq.desSeq(self.sequence, self.lower, self.upper, other)
			return Sequence(sq.toString(res, list(res)[0], list(res)[-1]))
		l = min(self.lower, other.lower)
		u = max(self.upper, other.upper)
		res = sq.addSeqs(self.sequence, other.sequence, l, u)
		return Sequence(sq.toString(res[0], res[1], res[2]))

	def __iadd__(self, other): #f(n) += f(n)
		l = min(self.lower, other.lower)
		u = max(self.upper, other.upper)
		res = sq.addSeqs(self.sequence, other.sequence, l, u)
		return Sequence(sq.toString(res[0], res[1], res[2]))

	def __sub__(self, other): #f(n) - g(n) ó f(n - C)
		if (type(other) == type(int())): #Cuando es desplazamiento
			res = sq.desSeq(self.sequence, self.lower, self.upper, -other)
			return Sequence(sq.toString(res, list(res)[0], list(res)[-1]))
		l = min(self.lower, other.lower)
		u = max(self.upper, other.upper)
		res = sq.subSeqs(self.sequence, other.sequence, l, u)
		return Sequence(sq.toString(res[0], res[1], res[2]))

	def __isub__(self, other): #f(n) -= f(n)
		l = min(self.lower, other.lower)
		u = max(self.upper, other.upper)
		res = sq.subSeqs(self.sequence, other.sequence, l, u)
		return Sequence(sq.toString(res[0], res[1], res[2]))
		
	def __mul__(self, other): #f(n) · g(n) ó f(n) · C
		if(type(other) == type(int())): #Cuando es amplificació o atenuación
			return Sequence(sq.toString(sq.ampSeq(self.sequence, self.lower, self.upper, other), self.lower, self.upper))
		else:
			l = min(self.lower, other.lower)
			u = max(self.upper, other.upper)
			res = sq.mulSeqs(self.sequence, other.sequence, l, u)
			return Sequence(sq.toString(res[0], res[1], res[2]))

	def __imul__(self, other): #f(n) *= f(n)
		l = min(self.lower, other.lower)
		u = max(self.upper, other.upper)
		res = sq.subSeqs(self.sequence, other.sequence, l, u)
		return Sequence(sq.toString(res[0], res[1], res[2]))

	def __neg__(self): #f(-n)
		res = sq.negSeq(self.sequence, self.lower, self.upper)
		return Sequence(sq.toString(res, list(res)[0], list(res)[-1]))