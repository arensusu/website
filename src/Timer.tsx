import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import './Timer.css';


const restPeriod = 17 * 60;
const workPeriod = 52 * 60;
function Timer() {
    const [restTime, setRestTime] = useState(0);
    const [isRestTimeCounting, setIsRestTimeCounting] = useState(false);
    const [workTime, setWorkTime] = useState(workPeriod);
    const [isWorkTimeCounting, setIsWorkTimeCounting] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [endTime, setEndTime] = useState(0);

    useEffect(() => {
        if (isWorkTimeCounting) {
            const endDate = (new Date().getTime()) + workPeriod * 1000;
            setEndTime(endDate);
            const intervalId = setInterval(() => {
                setWorkTime(time => time - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isWorkTimeCounting]);

    useEffect(() => {
        if (isRestTimeCounting) {
            const endDate = new Date().getTime() + restPeriod * 1000;
            setEndTime(endDate);
        }
    }, [isRestTimeCounting]);

    useEffect(() => {
        const remaining = (endTime - (new Date()).getTime()) / 1000;
        setMinutes(() => Math.floor(remaining / 60));
        setSeconds(() => Math.floor(remaining % 60));
        if (remaining <= 0) {
            
        }
    });

    return (
        <div className="Timer">
            <Header/>
            <h1 className='title'>{isRestTimeCounting ? 'Rest Time' : 'Work Time'}</h1>
            <p className='countdown'>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
            <p className='end-time'>{endTime}</p>
            <button className='start' onClick={() => { setIsWorkTimeCounting(true); }} disabled={isWorkTimeCounting}>Start</button>
        </div>
    );
}

export default Timer;
