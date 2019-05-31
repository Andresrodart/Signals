from sequence import *

def main():
	a = Sequence('{1 2 3 4 (5) 6 7 8 9}')
	b = Sequence('{1 2 3 4 (-5) 6 7 8 9}')
	c = Sequence('{-3 -4 (-5) -6 -7 -8}')
	d = Sequence('{-1 -2 3 -4 (-5) -6 -7 0 -9}')
	e = Sequence('{1 2 3 4 (-5) -6 -7 -8 -9}')
	f = Sequence('{-1 -2 -3 -4 (-5)}')
	g = Sequence('{(1) 2 3 4 5}')
	print((a - a).getString())
	print((a + b).getString())
	print((a + c).getString())
	print((a + d).getString())
	print((a + e).getString())
	print((a + f).getString())
	print((a * f).getString())
	print((a * e).getString())
	print((a * -b).getString())
	print((-a).getString())
	print((a - 3).getString())
	print((a - 10).getString())
	print((a + 3).getString())
	print((a + 10).getString())
	print((a * 3).getString())
	print((a * -3).getString())


if __name__ == "__main__":
	main()