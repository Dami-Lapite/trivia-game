import React, { useState, useRef, useEffect } from "react";
import "../styles/App.css";

const Timer = (props) => {
  // Ref is used to keep track of setInterval and
  // stop it when needed
  const Ref = useRef(null);
  // IsMounted is used to stop the setInterval loop
  // if the component isn't mounted
  const isMounted = useRef(false);

  // The state for the timer
  const [timer, setTimer] = useState("00:00");

  // Gets the time between current time and target time (e)
  // , the difference is the remaining countdown time duration.
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  // Resets the  time display
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    // Check if difference is positive, essentially
    // stops infinite calls to setTimer
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      if (minutes === 0 && seconds <= 10) {
        document.getElementById("timer").classList.add("running-out");
      }
    }
  };

  // Essentialy runs the timer
  const clearTimer = (e) => {
    // Initialize timer display
    setTimer("00:20");
    document.getElementById("timer").classList.remove("running-out");
    // Clear interval if still running
    if (Ref.current) clearInterval(Ref.current);
    // setInterval essentially resets the timer display
    // (using starttimer()) every second
    const id = setInterval(() => {
      // Only update timer display if component is mounted
      if (isMounted.current) startTimer(e);
    }, 1000);
    // Get id so interval can be stopped when needed
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // Adjust deadline to current time + (countdown duration)
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mounts the timer will start as soon as possible
  useEffect(() => {
    isMounted.current = true;
    clearTimer(getDeadTime());
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Triggers a call to parent component after countdown
  // duration. Countdown duration here is set separately from
  // the other functions.
  useEffect(() => {
    const timer = setTimeout(() => {
      props.parentCallBack();
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="timer" id="timer">
      <p>{timer}</p>
    </div>
  );
};

export default Timer;
