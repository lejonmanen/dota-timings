export default [
	{
		alarm: '0:00',
		name: 'Game start',
		secBefore: 20, secAfter: 3
	},
	{
		alarm: '4:00',
		name: 'Power rune spawn',
		secBefore: 15, secAfter: 3
	},
	{
		alarm: '5:00',
		name: 'Bounty runes spawn',
		secBefore: 25, secAfter: 3
	},
].map(addAlarmSeconds);

function addAlarmSeconds(obj) {
	let nums = obj.alarm.split(':')
	return { ...obj, secAlarm: 60 * +nums[0] + +nums[1] }
}
