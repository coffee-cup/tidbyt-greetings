import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { useState, useEffect } from "react";

export const TimeDisplayed = ({ time }: { time: string }) => {
  const [displayTime, setDisplayTime] = useState(dayjs(time).fromNow(true));

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayTime(dayjs(time).fromNow(true));
    }, 10000);

    return () => clearInterval(timer);
  }, [time]);

  return <time dateTime={time}>{displayTime}</time>;
};
