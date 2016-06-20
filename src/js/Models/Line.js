class Line {
	

	/*  
	 * y = mx + b
	 *   _____________ +x
	 *  |  
	 *	|   p1   positive
	 *  |    \
	 *  |     \
	 *  |      p2
	 * +y
	 *
	 */
	constructor(p1, p2) {

		this.p1 = p1;
		this.p2 = p2;

		this.slope = (p2.y - p1.y) / (p2.x - p1.x);
	}


}