import re

def createSeq(strSeq):
	flag = False #Bandera que verifica si hay solo ceros
	newSeq = {}
	searched = re.search(r"\([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\)", strSeq) #Encuentra cero
	if (searched == None): #No se especifico cero, , regresa seq vacia
		newSeq[0] = 0
		return newSeq
	zeroStr = searched.group(0) #Guarda cero
	preSeq = strSeq[1:-1].split() #Elimina llaves
	zeroIndex = preSeq.index(zeroStr) #Desde donde se va a empezar la secuencia
	j = -zeroIndex
	
	for i in preSeq:
		if i == '0' and not flag: #Omite ceros que no se necesitan mostrar del lado negativo
			j += 1
			continue

		if (i != '0'): #Cuando estan entre un numero o no hay cero
			flag = True

		if flag: #Se añaden a la secuencia
			if j == 0: #Se añade el cero
				newSeq[j] = float(i[1:-1])
				j += 1
				continue
			if i[0] == '(' or i[-1] == ')': #Encontró más de un cero, regresa seq vacia
				newSeq = {}
				newSeq[0] = 0
				return newSeq
			newSeq[j] = float(i) #Se añade un elemento
			j += 1

	upper = list(newSeq)[-1]
	flag = True
	for i in range(upper, 0, -1): #Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag and newSeq[i] != 0): flag = False
		if (flag):
			del(newSeq[i])

	return newSeq

def toString(preStr, l, u):
	strSeq = '[' #Abre Corchete
	for i in range(l, u + 1): #Toma todos los valores de la secuencia
		if (i == 0): #Si es cero, lo marca
			strSeq += ('(' + str(preStr[i]) + ') ')
			continue
		strSeq += (str(preStr[i]) + ' ') #Si no, solo lo agrega con espacio
	strSeq = strSeq[:-1] + ']' #Cierra corchete

	return strSeq

def addSeqs(a, b, lower, upper):
	newSeq = {}
	flag, tmp = False, 0

	for i in range(lower, upper + 1): #Suma uno a uno
		try: tmp = a[i] #Si existe valor en el dictionario, asgina a en la posición i
		except: tmp = 0 #No exite en el dictionario, asigna 0
		try: tmp += b[i] #Si existe valor en el dictionario, suma con b en la posición i
		except: tmp += 0 #No exite en el dictionario, suma con 0

		if ((not flag and tmp != 0) or i >= 0): #Omite ceros del lado negativo
			flag = True
		if flag: #Asgina valores
			newSeq[i] = tmp

	flag = True
	for i in range(upper, 0, -1): #Elimina ceros que no se necesitan mostrar del lado positivo
		if (flag and newSeq[i] != 0): flag = False
		if (flag):
			del(newSeq[i])

	return [newSeq, list(newSeq)[0], list(newSeq)[-1]] #Regresa sequencia, posición inicial, posición final

def subSeqs(a, b, lower, upper): #Funciona igual que la suma
	newSeq = {}
	flag, tmp = False, 0

	for i in range(lower, upper + 1):
		try: tmp = a[i]
		except: tmp = 0
		try: tmp -= b[i]
		except: tmp -= 0

		if ((not flag and tmp != 0) or i >= 0):
			flag = True
		if flag:
			newSeq[i] = tmp

	flag = True
	for i in range(upper, 0, -1):
		if (flag and newSeq[i] != 0): flag = False
		if (flag):
			del(newSeq[i])

	return [newSeq, list(newSeq)[0], list(newSeq)[-1]]

def mulSeqs(a, b, lower, upper): #Funciona igual que la suma
	newSeq = {}
	flag, tmp = False, 0

	for i in range(lower, upper + 1):
		try: tmp = a[i]
		except: tmp = 0
		try: tmp *= b[i]
		except: tmp *= 0

		if ((not flag and tmp != 0) or i >= 0):
			flag = True
		if flag:
			newSeq[i] = tmp

	flag = True
	for i in range(upper, 0, -1):
		if (flag and newSeq[i] != 0): flag = False
		if (flag):
			del(newSeq[i])

	return [newSeq, list(newSeq)[0], list(newSeq)[-1]]

def negSeq(a, lower, upper): #Reflejo f(n) = f(-n)
	newSeq = {}
	j = upper
	for i in range(-upper, -(lower - 1)):
		newSeq[i] = a[j]
		j -= 1
	return newSeq

def ampSeq(a, lower, upper, C): #Amplificación/Atenuación
	newSeq = {}
	for i in range(lower, upper + 1):
		newSeq[i] = C * a[i]
	return newSeq

def desSeq(a, lower, upper, C): #Desplazamiento
	newSeq, aux = {}, {}
	if C == 0: #Si se desplaza 0, regresa la misma secuencia
		return a
	for i in range(lower - C, upper + 1 - C): #Se recorre la secuencia, aquí no contará cero agregados, i.e. cuando se desplaza más allá del tamaño
		try: newSeq[i] = a[i + C] #Si existe la posición i + C, asignalo a la nueva secuencia
		except: newSeq[i] = 0 #Si no, agrega cero
	l = list(newSeq)[0] #Nuevo posicion inicial
	u = list(newSeq)[-1] #Nuevo posicion final
	if (l > 0 and u > 0): #Si creció de más de los positivos, agrega ceros faltantes
		for i in range(0, list(newSeq)[0]): #Los ceros se anexan al final
			newSeq[i] = 0
		for j in sorted(newSeq): #Se acomdan (ordenan)
			aux[j] = newSeq[j]
		return aux
	elif (l < 0 and u < 0): #Si creció de más de los negativos, agrega ceros faltantes
		for i in range(u + 1, 0 + 1):
			newSeq[i] = 0
	return newSeq

def conSeq(a, lowerA, upperA, b, lowerB, upperB):
	return a