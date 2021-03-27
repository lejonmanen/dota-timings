import './App.css';
import { useState, useEffect, useRef } from 'react';
import defaultEventList from './data/eventList.js'
import TimedEvent from './components/TimedEvent'
import { stringToSec, secToString } from './utils/utils'

// Game starts at ???? TODO find out
const defaultStartTime = '-0:24'

function App() {
    const [eventList, setEventList] = useState([])
    const [stringTime, setStringTime] = useState(defaultStartTime)
    const [isRunning, setIsRunning] = useState(false)
    const isRunningRef = useRef(isRunning)
    isRunningRef.current = isRunning

    // console.log('App is running? ' + isRunning);

    const time = stringToSec(stringTime)
    const timeRef = useRef(time)
    timeRef.current = time;

    const events = eventList.map(te => (
        <TimedEvent te={te} time={time}
            key={te.alarm+te.name} />
    ))

    const increaseTime = () => {
        // console.log('inside increaseTime');
        setTimeout(
            () => {
                if( !isRunningRef.current ) return;

                if( setStringTime ) {
                    setStringTime(secToString(timeRef.current + 1)) }
                increaseTime();
            },
            1000
        );
    }

    useEffect(() => {
        setEventList(defaultEventList)
    }, [])

    const toggleTimer = () => {
        setIsRunning(!isRunning);
        // console.log('toggle timer', isRunning);
        if( !isRunning )
            increaseTime()
    }
    const resetTime = () => {
        setStringTime(defaultStartTime)
    }
    const modTime = diff => setStringTime(secToString(stringToSec(stringTime) + diff))
    const add3 = () => modTime(3)
    const sub3 = () => modTime(-3)

    return (
        <div className="App">
        <header className="App-header">
            <span className="game-time">[{stringTime}]</span>
            <span>Dota 2 timings</span>
        </header>
        <main>
            <button onClick={toggleTimer}> {isRunning ? 'Pause' : 'Start'} </button>
            <button onClick={resetTime}> Reset </button>
            <button onClick={add3}> +3s. </button>
            <button onClick={sub3}> -3s. </button>

            {events}
        </main>
        </div>
    );
}

export default App;
