import './App.css';
import { useState, useEffect, useRef } from 'react';
import defaultEventList from './data/eventList.js'
import TimedEvent from './components/TimedEvent'
import { stringToSec, secToString } from './utils/utils'


function App() {
    const [eventList, setEventList] = useState([])
    const [stringTime, setStringTime] = useState('-0:21')
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
        console.log('toggle timer', isRunning);
        if( !isRunning )
            increaseTime()
    }

    return (
        <div className="App">
        <header className="App-header">
            <span className="game-time">[{stringTime}]</span>
            <span>Dota 2 timings</span>
        </header>
        <main>
            <button onClick={toggleTimer}> {isRunning ? 'Stop' : 'Start'} </button>

            {events}
        </main>
        <footer>
            Footah
        </footer>
        </div>
    );
}

export default App;
