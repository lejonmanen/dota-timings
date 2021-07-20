import { useState } from 'react'
import { secondsToString } from '../utils/utils.js'
import './TimedEvent.css'


//  name: event.name, startTime: event.time, isSingleEvent: !event.periodicity, interval: event.periodicity
const EventBox = ({ time, startTime, name, isSingleEvent, interval }) => {
	const [lastTime, setLastTime] = useState(startTime)
	let nextTime = isSingleEvent ? null
		: (time < startTime) ? lastTime : lastTime + interval

	let nt = secondsToString(nextTime)
	let timeLeft = secondsToString(nextTime - time)
	let timeClass = ''
	// console.log(`Event: ${name} with next time = ${nt}. time=${time}`);
	// console.log('Event box:', time, name, interval, lt, nt);

	if( !isSingleEvent ) {
		if( time >= nextTime ) {
			setLastTime(time => time + interval)
			nextTime += interval
		}
		timeClass = getTimeClass(time, lastTime, nextTime)
	} else {
		timeClass = getSingleTimeClass(time, nextTime)
	}

	return (
		<div className={"timed-event " + timeClass}>
			<strong> {name} </strong>
			<div className="next-time"> {nt} - next </div>
			{ !isSingleEvent || time < nextTime
				? <div> {timeLeft} - time left </div>
				: null
			}
		</div>
	)
}

function getSingleTimeClass(currentTime, time) {
	if( currentTime > time ) return 'past'
	else if( time - currentTime < 7 ) return 'critical'
	else if( time - currentTime < 15 ) return 'near'
	else return ''
}
function getTimeClass(currentTime, lastTime, nextTime) {
	// last - current - next
	let diff = nextTime - currentTime
	if( diff < 0 ) return 'past'  // should not happen
	else if( diff <= 6 ) return 'critical'
	else if( diff <= 12 ) return 'near'
	else return ''
}

export default EventBox
