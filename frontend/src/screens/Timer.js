/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment';

const Timer = props => {

    const history = useHistory();

    var today = moment(props.items).format('MMMM DD, YYYY hh:mm:ss');

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();
    const startTimer = () => {
        const countdowndate = new Date(today).getTime();

        interval = setInterval(() => {
            var current = moment().format('MMMM DD, YYYY hh:mm:ss');
            const now = new Date(current).getTime();
            const distance = countdowndate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            days = (days).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            hours = (hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            minutes = (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            seconds = (seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

            if (distance < 0) {
                history.push('/reqforfood');
                clearInterval(interval.current);
            }
            else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    }, []);

    return (
        <div>
            <p className="text-danger">Expires in : {timerDays}:{timerHours}:{timerMinutes}:{timerSeconds}</p>
        </div>
    );
};
export default Timer;