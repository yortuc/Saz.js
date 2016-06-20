var requestAnimationFrame =  window.requestAnimationFrame ||
					         window.webkitRequestAnimationFrame ||
					         window.mozRequestAnimationFrame    ||
					         function( callback ){
					         	window.setTimeout(callback, 1000 / 60);
					         };

export default requestAnimationFrame;