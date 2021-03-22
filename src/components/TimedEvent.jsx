import React from 'react';

const TimedEvent = ({ te, time }) => {
	const alarm = te.secAlarm
	const before = alarm - te.secBefore
	const near   = alarm - 4
	const crit   = alarm + te.secAfter
	// console.log(time, before, near, crit);

	let timeCss = '';
	if( time < before ) {}
	else if( time < near ) { timeCss = 'near' }
	else if( time < crit ) { timeCss = 'critical' }
	else { timeCss = 'past' }

	return (
		<div className={'timed-event ' + timeCss}>
			<strong>{te.name}</strong>
			Alarm at {te.alarm}
		</div>
	)
};

export default TimedEvent;
