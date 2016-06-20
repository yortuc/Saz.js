
import Resources from "./../utils/resources";
import Graphics from "./../utils/graphics";

var map = `0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,24,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,73,73,24,73,73,73,73,73,73,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,24,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,73,73,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0`;

var map2 = `24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,29,0,24,24,29,24,24,24,29,24,0,29,0,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,29,0,0,0,29,0,0,0,29,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,
24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,24,0,0,29,0,0,0,29,0,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,
24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,0,0,0,0,0,0,0,0,0,0,0,24,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29`;


let dependencies = {
	 "0":{ "image":"pad.png"},
	 "1":{ "image":"player.png"},
	 "10":{ "image":"boxCoin.png"},
	 "11":{ "image":"boxCrate_double.png"},
	 "12":{ "image":"boxCrate_single.png"},
	 "13":{ "image":"boxCrate_warning.png"},
	 "14":{ "image":"boxCrate.png"},
	 "15":{ "image":"boxExplosive_disabled.png"},
	 "16":{ "image":"boxExplosive_used.png"},
	 "17":{ "image":"boxExplosive.png"},
	 "18":{ "image":"boxItem_boxed.png"},
	 "19":{ "image":"boxItem_disabled_boxed.png"},
	 "2":{ "image":"p1_walk.png"},
	 "20":{ "image":"boxItem_disabled.png"},
	 "21":{ "image":"boxItem.png"},
	 "22":{ "image":"brickBrown.png"},
	 "23":{ "image":"wall.png"},
	 "24":{ "image":"wall.png"},
	 "25":{ "image":"bridgeB.png"},
	 "26":{ "image":"bush.png"},
	 "27":{ "image":"cactus.png"},
	 "28":{ "image":"chain.png"},
	 "29":{ "image":"doorClosed_mid.png"},
	 "3":{ "image":"bomb.png"},
	 "30":{ "image":"doorClosed_top.png"},
	 "31":{ "image":"doorOpen_mid.png"},
	 "32":{ "image":"doorOpen_top.png"},
	 "33":{ "image":"empty.png"},
	 "34":{ "image":"fence.png"},
	 "35":{ "image":"fenceBroken.png"},
	 "36":{ "image":"grass.png"},
	 "37":{ "image":"ladderMid.png"},
	 "38":{ "image":"ladderTop.png"},
	 "39":{ "image":"lava.png"},
	 "4":{ "image":"bombWhite.png"},
	 "40":{ "image":"lavaTop_high.png"},
	 "41":{ "image":"lavaTop_low.png"},
	 "42":{ "image":"leverLeft.png"},
	 "43":{ "image":"leverMid.png"},
	 "44":{ "image":"leverRight.png"},
	 "45":{ "image":"lockBlue.png"},
	 "46":{ "image":"lockGreen.png"},
	 "47":{ "image":"lockRed.png"},
	 "48":{ "image":"lockYellow.png"},
	 "49":{ "image":"mushroomBrown.png"},
	 "5":{ "image":"box_done.png"},
	 "50":{ "image":"mushroomRed.png"},
	 "51":{ "image":"plantPurple.png"},
	 "52":{ "image":"rock.png"},
	 "53":{ "image":"sign.png"},
	 "54":{ "image":"signExit.png"},
	 "55":{ "image":"signLeft.png"},
	 "56":{ "image":"signRight.png"},
	 "57":{ "image":"snow.png"},
	 "58":{ "image":"spikes.png"},
	 "59":{ "image":"spring.png"},
	 "6":{ "image":"box.png"},
	 "60":{ "image":"sprung.png"},
	 "61":{ "image":"switchBlue_pressed.png"},
	 "62":{ "image":"switchBlue.png"},
	 "63":{ "image":"switchGreen_pressed.png"},
	 "64":{ "image":"switchGreen.png"},
	 "65":{ "image":"switchRed_pressed.png"},
	 "66":{ "image":"switchRed.png"},
	 "67":{ "image":"switchYellow_pressed.png"},
	 "68":{ "image":"switchYellow.png"},
	 "69":{ "image":"torch1.png"},
	 "7":{ "image":"boxCoin_boxed.png"},
	 "70":{ "image":"torch2.png"},
	 "71":{ "image":"torchOff.png"},
	 "72":{ "image":"wall.png"},
	 "73":{ "image":"water.png"},
	 "74":{ "image":"waterTop_high.png"},
	 "75":{ "image":"waterTop_low.png"},
	 "76":{ "image":"weight.png"},
	 "77":{ "image":"weightAttached.png"},
	 "78":{ "image":"window.png"},
	 "8":{ "image":"boxCoin_disabled_boxed.png"},
	 "9":{ "image":"boxCoin_disabled.png"},
	 "bg1": {"image": "bg2.jpg"}
}

let collidingTileNums = [
	23,28,6,10
]

function getTileImage (tileNum) {
	return dependencies[tileNum-1]["image"];
}

function isTileCollidible(tileNum) {
	return collidingTileNums.indexOf(tileNum-1) > -1;
}

export default {
	dependencies: dependencies,
	getTileImage: getTileImage,
	map: map2,
	isTileCollidible: isTileCollidible
};