import React, { useState } from 'react';
import './TimedEvent.css'

const TimedEvent = ({ te, time }) => {
	const [visible, setVisible] = useState(true);
	const alarm = te.secAlarm
	const before = alarm - te.secBefore
	const near   = alarm - te.secNear
	const crit   = alarm + te.secAfter
	// console.log(time, before, near, crit);

	let timeCss = '';
	if( time < before ) {}
	else if( time < near ) { timeCss = 'near' }
	else if( time < crit ) { timeCss = 'critical' }
	else { timeCss = 'past' }

	let removeAfterAnim = null;
	if( timeCss === 'past' )
		removeAfterAnim = () => setVisible(false);
	else if( !visible )
		setVisible(true);
	// const maybeHide = () => {
	// 	if( timeCss === 'past' )
	// 		setVisible(false)
	// 	else if( !visible )
	// 		setVisible(true)  // support rewinding the clock
	// };
	if( !visible )
		return null;

	return (
		<div className={`timed-event ${timeCss} ${visible ? '' : 'hide'}`}
			onAnimationEnd={removeAfterAnim} >
			<strong>{te.name}</strong>
			{te.alarm}
		</div>
	)
};

export default TimedEvent;
