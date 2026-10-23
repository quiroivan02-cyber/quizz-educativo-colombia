
import { useEffect, useRef, useState } from "react";
import { playCountdownTick } from "../audio/gameSounds";

export default function Timer({ setTimeOut, questionNumber, bonusSeconds = 0, initialSeconds = 45 }) {
  const [timer, setTimer] = useState(initialSeconds);
  const appliedBonus = useRef(0);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      playCountdownTick(timer);
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(initialSeconds);
  }, [questionNumber, initialSeconds]);

  useEffect(() => {
    const extraSeconds = bonusSeconds - appliedBonus.current;
    if (extraSeconds > 0) {
      appliedBonus.current = bonusSeconds;
      setTimer((previous) => previous + extraSeconds);
    }
  }, [bonusSeconds]);

  return timer;
}
