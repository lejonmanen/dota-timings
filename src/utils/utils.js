function stringToSec(stringTime) {
	if( stringTime.charAt(0) === '-' )
		return -stringToSec(stringTime.substr(1));

	// console.log('stringToSec string='+stringTime);
	let nums = stringTime.split(':')
	return 60 * +nums[0] + +nums[1];
}


function secToString(seconds) {
	if( seconds < 0 ) return '-' + secToString(-seconds);

	// console.log('secToString seconds='+seconds);
	let secs = seconds % 60;
	let mins = (seconds - secs) / 60;
	return `${mins}:${secs}`
}


export { stringToSec, secToString }
