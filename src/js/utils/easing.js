export default {
	// t: current time, b: begInnIng value, c: change In value, d: duration

	easeOut: function (t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},

	easeIn: function(t, b, c, d) {
		return c - this.easeOut (d-t, 0, c, d) + b;
	},

	easeInOut: function (t, b, c, d) {
		if (t < d/2) {
			return this.easeIn (t*2, 0, c, d) * .5 + b;
		}
		else {
			return this.easeOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}