function toUnix(date){
	return Math.round(date.getTime() / 1000);
}

function fromUnix(unix){
	if (typeof unix === 'string'){
		unix = parseInt(unix, 10);
	}
	return new Date(unix * 1000);
}

module.exports.toUnix = toUnix;
module.exports.fromUnix = fromUnix;