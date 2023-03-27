import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';


function Timer() {
    const restPeriod = 52 * 60;
    const [restTime, setRestTime] = useState(0);
    const [isRestTimeCounting, setIsRestTimeCounting] = useState(false);
    const workPeriod = 17 * 60;
    const [workTime, setWorkTime] = useState(workPeriod);
    const [isWorkTimeCounting, setIsWorkTimeCounting] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isWorkTimeCounting) {
            setWorkTime(() => workPeriod);
            const intervalId = setInterval(() => {
                setWorkTime(time => time - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isWorkTimeCounting]);

    useEffect(() => {
        if (isRestTimeCounting) {
            setRestTime(() => restPeriod);
            const intervalId = setInterval(() => {
                setRestTime(time => time - 1)
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isRestTimeCounting]);

    useEffect(() => {
        setMinutes(() => Math.floor(restTime / 60));
        setSeconds(() => Math.floor(restTime % 60));
        if (restTime === 0) {
            setIsRestTimeCounting(false);
        }
    }, [restTime]);

    useEffect(() => {
        setMinutes(() => Math.floor(workTime / 60));
        setSeconds(() => Math.floor(workTime % 60));
        if (workTime === 0) {
            setTimeout(()=>{
                console.log('sleep');
                setIsWorkTimeCounting(false);
                setIsRestTimeCounting(true);
            }, 1000)
        }
    }, [workTime]);

    return (
        <div className="Timer">
            <Header/>
            <h1>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
            <button onClick={() => { setIsWorkTimeCounting(true); }}>Start</button>
        </div>
    );
}

export default Timer;
