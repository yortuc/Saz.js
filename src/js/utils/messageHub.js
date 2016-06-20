export default {
	init: function (channels) {
		this.channels = {};

		channels.map(c=> this.channels[c]=[]);
	},

	subscribe: function(channel, callBack){
		if(this.channels[channel]){
			this.channels[channel].push(callBack);
		}
		else{
			console.log("channel is not registered (" + channel + ")");
		}
	},

	emit: function(channel, data) {
		const objChannels = this.channels[channel] || [];
		
		objChannels.map(c=> c(data));
	}
}