
import "./App.css";
import React, { useEffect, useMemo, useRef, useState} from "react";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";
import questions, { getRandomQuestionSequence } from "./questions";
import { getGradeIncrement } from "./game/scoring";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const [restartGame, setRestartGame] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [gameTheme, setGameTheme] = useState(null);
  const [gameMode, setGameMode] = useState("money");
  const [earnedGrade, setEarnedGrade] = useState(0);
  const [timerBonus, setTimerBonus] = useState(0);
  const lastQuestionSets = useRef({});

  const handleRestartGame = () => {
    setRestartGame(true);
    setQuestionNumber(1); // Reinicia el número de pregunta si es necesario
    setTimeOut(false); // Reinicia el temporizador si es necesario
    setEarned("$ 0"); // Reinicia las ganancias si es necesario
    setEarnedGrade(0);
  };

  const handleStartGame = (name, selectedTheme, selectedMode = "money") => {
    const storageKey = `quiz-question-history-v2-${selectedTheme}`;
    let previousSets = lastQuestionSets.current[selectedTheme] || [];
    try {
      previousSets = JSON.parse(window.localStorage.getItem(storageKey)) || previousSets;
    } catch {
      // If browser storage is unavailable, avoid repeating the set for this app session instead.
    }
    const nextQuestions = getRandomQuestionSequence(questions[selectedTheme], previousSets);
    const nextIds = nextQuestions.map(({ id }) => id);
    const questionHistory = [...previousSets, nextIds].slice(-100);
    lastQuestionSets.current[selectedTheme] = questionHistory;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(questionHistory));
    } catch {
      // The game still works without persistent browser storage.
    }
    setGameData(nextQuestions);
    setGameTheme(selectedTheme);
    setGameMode(selectedMode);
    setTimerBonus(0);
    setUsername(name);
    setRestartGame(false);
    setTimeOut(false);
    setQuestionNumber(1);
    setEarned("$ 0");
    setEarnedGrade(0);
  };


  const data = gameData;

  const moneyPyramid = useMemo(
    () => Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      amount: `$ ${(index + 1) * 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    })).reverse(),
    []
  );

  const gradePyramid = useMemo(
    () => Array.from({ length: 20 }, (_, index) => {
      const question = index + 1;
      const grade = question <= 15 ? question * 0.3 : 4.5 + (question - 15) * 0.1;
      return { id: question, amount: `Nota ${grade.toFixed(1)}` };
    }).reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1)?.amount || "$ 2.000");
    }
    if (questionNumber > data.length && data.length) setTimeOut(true);
  }, [questionNumber, moneyPyramid, data.length]);

  return (
    <div className="app">
     {!username || restartGame ? (
  <Start onStartGame={handleStartGame} />

) : (
        <>
          <div className="main">
            {timeOut ? (
              <div className="endTextContainer">
              <h1 className="endText">
                {gameMode === "grade" ? `Nota final: ${earnedGrade.toFixed(1)} / 5.0` : `Has ganado: ${earned}`}
              </h1>
              <button className="restartButton" onClick={handleRestartGame}>Iniciar nuevo juego</button>
            </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                      bonusSeconds={timerBonus}
                      initialSeconds={gameTheme === "Matemáticas" ? 70 : 45}
                    />
                  </div>
                  {gameMode === "grade" && (
                    <div className="gradeDisplay" role="status" aria-live="polite">
                      Nota acumulada: {earnedGrade.toFixed(1)} / 5.0
                    </div>
                  )}
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                    onCorrectAnswer={(number) => {
                      setEarnedGrade((previous) => Number((previous + getGradeIncrement(number)).toFixed(1)));
                    }}
                    onUseLifeline={() => setTimerBonus((previous) => previous + 60)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
            {(gameMode === "grade" ? gradePyramid : moneyPyramid).map((m) => (
  <li
    key={m.id} // Agrega una clave única aquí
    className={
      questionNumber === m.id
        ? "moneyListItem active"
        : "moneyListItem"
    }
  >
    <span className="moneyListItemNumber">{m.id}</span>
    <span className="moneyListItemAmount">{m.amount}</span>
  </li>
))}

            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
