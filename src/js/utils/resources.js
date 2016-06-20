// load resources (images)
export default {

    images: {},


    loadImages: function(sources, callback) {

        var loadedImages = 0;
        var numImages = 0;

        for (var src in sources) {
            numImages++;
        }

        for (var src in sources) {
            var key = sources[src].image;
            this.images[key] = new Image();
            this.images[key].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(this.images);
                }
            }.bind(this);
            
            var imagePath = sources[src].image;

            this.images[key].src = "images/" + imagePath;
        }
    } ,

    loadImagesFromArray: function(sourcesArr, callback) {

        var loadedImages = 0;
        var numImages = sourcesArr.length;

        for (var i=0; i<sourcesArr.length; i++) {
            let source = sourcesArr[i];

            this.images[source] = new Image();
            this.images[source].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(this.images);
                }
            }.bind(this);

            this.images[source].src = "images/" + source;
        }
    } 
};