// tilemap map importer
import GameObject from '../Core/GameObject';
import Transform from '../Components/Transform';
import RectangleRenderer from '../Components/RectangleRenderer';
import SpriteRenderer from '../Components/SpriteRenderer'
import Resources from '../utils/resources';

const TILE_SIZE = 36;

export default {
	
	parseLevel: function (level) {
		
		let gameObjects = [];
		let rows = level.map.split('\n');

		for(let j=0; j<rows.length; j++){

			let row = rows[j].split(',');

			for(let i=0; i<row.length; i++){
				let col = row[i];

				if(col !== "" && col !== "0"){
					var imageKey = level.getTileImage(col);
					var collides = level.isTileCollidible(col);

					gameObjects.push( this.createTile( col, imageKey, collides, i, j ) );
				}
			
			}
		}

		return gameObjects;
	},

	createTile: function(tileNum, imageKey, collides, i, j){
		let tileX = TILE_SIZE/2 + i * TILE_SIZE;
		let tileY = TILE_SIZE/2 + j * TILE_SIZE;

		var kutu = new GameObject();
			new Transform(kutu, {x: tileX , y: tileY, width: TILE_SIZE, height: TILE_SIZE, collides: collides });

			new SpriteRenderer(kutu, { size: 36, spriteSheet: Resources.images[ imageKey ] });

		return kutu;
	}	
}