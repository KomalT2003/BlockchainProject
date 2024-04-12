import React from "react";
import { useState,useEffect } from "react";

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function GoodDay(props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-2xl">Have a Nice {days[time.getDay()]}!</p>
      <p className="text-4xl">Good Day {props.user}</p>
      <p className="text-2xl">{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default GoodDay;
