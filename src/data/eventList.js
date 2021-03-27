
function addAlarmSeconds(obj) {
	let nums = obj.alarm.split(':')
	return { ...obj, secAlarm: 60 * +nums[0] + +nums[1] }
}

const outposts = ['10:00', '20:00', '30:00', '40:00', '50:00', '60:00', '70:00', '80:00', '90:00'].map(time => ({
	alarm: time,
	name: 'Outpost xp',
	secBefore: 35, secNear: 5, secAfter: 1
}))
const power = (() => {
	let xs = []
	for( let i=4; i<=90; i+=2 )
		xs.push(i + ':00')
	return xs;
})().map(time => ({
	alarm: time,
	name: 'Power rune spawn',
	secBefore: 15, secNear: 3, secAfter: 4
}));
const bounty = (() => {
	let xs = []
	for( let i=0; i<=90; i+=5 )
		xs.push(i + ':00')
	return xs;
})().map(time => ({
	alarm: time,
	name: 'Bounty runes spawn',
	secBefore: 25, secNear: 7, secAfter: 4
}));

export default [
	{
		alarm: '0:00',
		name: 'Game start',
		secBefore: 20, secNear: 10, secAfter: 1
	},
	...bounty,
	...power,
	...outposts
]
.map(addAlarmSeconds)
.sort((x, y) => x.secAlarm < y.secAlarm ? -1 : x.secAlarm > y.secAlarm ? 1 : 0)
