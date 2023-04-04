import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import './Timer.css';

const METHOD = {
    '52/17': [52 * 60, 17 * 60],
    pomodoro: [25 * 60, 5 * 60]
}

function Timer() {
    const [workingMethod, setWorkingMethod] = useState('52/17');
    const [isRestTimeCounting, setIsRestTimeCounting] = useState(false);
    const [isWorkTimeCounting, setIsWorkTimeCounting] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const endTime = useRef(0);

    useEffect(() => {
        if (isWorkTimeCounting) {
            const intervalId = setInterval(() => {
                const remaining = (endTime.current - (new Date()).getTime()) / 1000;
                if (remaining <= 0) {
                    setIsWorkTimeCounting(false);
                    endTime.current = (new Date().getTime()) + METHOD[workingMethod as keyof typeof METHOD][1] * 1000;
                    setIsRestTimeCounting(true);
                }
                else {
                    setMinutes(() => Math.floor(remaining / 60));
                    setSeconds(() => Math.floor(remaining % 60));
                }
            }, 100);
            return () => clearInterval(intervalId);
        }
    }, [isWorkTimeCounting]);

    useEffect(() => {
        if (isRestTimeCounting) {
            const intervalId = setInterval(() => {
                const remaining = (endTime.current - (new Date()).getTime()) / 1000;
                if (remaining <= 0) {
                    setIsRestTimeCounting(false);
                }
                else {
                    setMinutes(() => Math.floor(remaining / 60));
                    setSeconds(() => Math.floor(remaining % 60));
                }
            }, 100);
            return () => clearInterval(intervalId);
        }
    }, [isRestTimeCounting]);

    useEffect(() => {
        if (workingMethod === '52/17') {
            setMinutes(52);
        } else {
            setMinutes(25);
        }
        setSeconds(0);
        endTime.current = 0;
        setIsWorkTimeCounting(false);
        setIsRestTimeCounting(false);
    }, [workingMethod]);

    const startCounting = () => {
        endTime.current = (new Date().getTime()) + METHOD[workingMethod as keyof typeof METHOD][0] * 1000;
        setIsWorkTimeCounting(true);
    }

    return (
        <div className="Timer">
            <Header/>
            <div className='timer-state'>
                <div className='timer-option' aria-disabled={'52/17' !== workingMethod} onClick={() => {setWorkingMethod('52/17');}}>52/17</div>
                <div className='timer-option' aria-disabled={'pomodoro' !== workingMethod} onClick={() => {setWorkingMethod('pomodoro');}}>Pomodoro</div>
            </div>
            <h1 className='title'>{isRestTimeCounting ? 'Rest Time' : 'Work Time'}</h1>
            <p className='countdown'>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
            { endTime.current === 0 ? <></> : <p className='end-time'>{(new Date(endTime.current)).toLocaleString('en-US')}</p>}
            <button className='start' onClick={startCounting} disabled={isWorkTimeCounting || isRestTimeCounting}>Start</button>
        </div>
    );
}

export default Timer;
