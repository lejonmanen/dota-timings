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

function secondsToString(sec) {
    let text = ''
    if( sec < 0 ) {
        text += '-'
        sec = -sec
    }
    let minutes = Math.floor(sec / 60)
    let seconds = Math.floor(sec % 60) + ''
    if( seconds.length < 2 ) seconds = '0' + seconds
    let fraction = Math.round((sec % 1) * 10)
    return text + `${minutes}:${seconds}.${fraction}`
}

export { stringToSec, secToString, secondsToString }
