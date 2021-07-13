import './App.css';
import { useState, useEffect, useRef } from 'react';
// import defaultEventList from './data/eventList.js'
import defaultEvents from './data/events.js'
import EventBox from './components/EventBox'
import { secondsToString } from './utils/utils'

// Game starts at circa -45, but we need some margin to let the user sync the timer
const defaultStartTime = -24.0 //'-0:24'
const events = normalizeEvents(defaultEvents)

function App() {
    // Current time in seconds
    const [time, setTime] = useState(defaultStartTime)
    const [now, setNow] = useState(Date.now() / 1000)

    const [isRunning, setIsRunning] = useState(false)
    const isRunningRef = useRef(isRunning)
    isRunningRef.current = isRunning


    useEffect(() => {
        const intervalId = setInterval(
            () => {
                // maybe set time
                const newNow = Date.now() / 1000
                if( isRunningRef.current ) {
                    let diff = newNow - now
                    setTime(t => Math.round((t + diff) * 10) / 10)
                }
                setNow(newNow)
            },
            100  // every 100ms
        )
        return () => clearInterval(intervalId)
    })


    const toggleTimer = () => {
        setIsRunning(!isRunning);
    }
    const resetTime = () => {
        setTime(defaultStartTime)
    }
    // const modTime = diff => setStringTime(secToString(stringToSec(stringTime) + diff))
    const add3 = () => setTime(t => t + 3)
    const sub3 = () => setTime(t => t - 3)

    const stringTime = secondsToString(time)

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

            <div className="container">
            {events.map(e => <EventBox {...e} time={time} key={e.name} />)}
            </div>
        </main>
        </div>
    );
}


function normalizeEvents(list) {
    console.log(list);
    return list.map(event => (
        {
            name: event.name,
            startTime: event.time,
            isSingleEvent: !event.periodicity,
            interval: event.periodicity
        }
    ))
}

export default App;
