import React, { useEffect, useState } from "react";

export const Timer = ({ seconds, onCountdownFinished }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) {
      onCountdownFinished();
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeLeft, onCountdownFinished]);

  return <span>{timeLeft}</span>;
};
