from sequence import *
sL = [] #Lista de Secuencias 
sN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
def main():
	sL.append(Sequence('{1 2 3 4 (5) 6 7 8 9}')) #a = sl[0]
	sL.append(Sequence('{1 2 3 4 (-5) 6 7 8 9}')) #b = sl[1]
	sL.append(Sequence('{-3 -4 (-5) -6 -7 -8}')) #c = sl[2]
	sL.append(Sequence('{-1 -2 3 -4 (-5) -6 -7 0 -9}')) #d = sl[3]
	sL.append(Sequence('{1 2 3 4 (-5) -6 -7 -8 -9}')) #e = sl[4]
	sL.append(Sequence('{-1 -2 -3 -4 (-5)}')) #f = sl[5]
	sL.append(Sequence('{0.75 -2 11 (10) 4 2 0 0 -1}')) #g = sl[6]
	sL.append(Sequence('{3 (2) 1}')) #h = sL[7]
	sL.append(Sequence('{10 (-0.5) 4 2 1 3}')) #i = sL[8]
	sL.append(Sequence('{2 3 (1)}')) #j = sL[9]
	for i in range(len(sL)):
		print(sN[i] + ' = ' + sL[i].getString())
	print('\n')
	print("a - a = " + (sL[8] - sL[9]).getString())
	print("a + b = " + (sL[0] + sL[1]).getString())
	print("a + c = " + (sL[0] + sL[2]).getString())
	print("a + d = " + (sL[0] + sL[3]).getString())
	print("a + e = " + (sL[0] + sL[4]).getString())
	print("a + f = " + (sL[0] + sL[5]).getString())
	print("a * f = " + (sL[0] * sL[5]).getString())
	print("a * e = " + (sL[0] * sL[4]).getString())
	print("a * -b = " + (sL[0] * -sL[1]).getString())
	print("-a = " + (-sL[0]).getString())
	print("a - 3 =  a(n - 3) = " +(sL[0] - 3).getString())
	print("a - 10 =  a(n - 10) = " + (sL[0] - 10).getString())
	print("a + 3 =  a(n + 3) = " + (sL[0] + 3).getString())
	print("a + 10 =  a(n + 10) = " + (sL[0] + 10).getString())
	print("a * 3 = " + (sL[0] * 3).getString())
	print("a * -3 = " + (sL[0] * -3).getString())
	print("g,2 = g(n * 2) = " + (sL[6].deciSequence(2)).getString())
	print("g,3 = g(n * 3) = " + (sL[6].deciSequence(3)).getString())
	print("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'Z')).getString()) #A Cero
	print("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'S')).getString()) #A Escalón
	print("a,3 = a(n / 3) = " + (sL[0].inteSequence(3, 'Z')).getString()) #A Cero
	print("a,3 = a(n / 3) = " + (sL[0].inteSequence(3, 'S')).getString()) #A Escalón
	print("a,2 = a(n / 2) = " + (sL[0].inteSequence(2, 'L')).getString()) #Lineal
	print("h,3 = h(n / 3) = " + (sL[7].inteSequence(3, 'L')).getString()) #Lineal
	print("i (x) j = " + (sL[8].conSequence(sL[9])).getString()) #Convolución
if __name__ == "__main__":
	main()