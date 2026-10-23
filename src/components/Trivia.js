import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import { playLifelineSound } from "../audio/gameSounds";

export default function Trivia({ data, questionNumber, setQuestionNumber, setTimeOut, onUseLifeline = () => {}, onCorrectAnswer = () => {} }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerClass, setAnswerClass] = useState("answer");
  const [hiddenAnswers, setHiddenAnswers] = useState([]);
  const [usedLifelines, setUsedLifelines] = useState({ fifty: false, phone: false, audience: 0 });
  const [lifelineModal, setLifelineModal] = useState(null);
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const selectedRef = useRef(null);
  const phaseRef = useRef("idle");
  const timersRef = useRef([]);
  const question = data[questionNumber - 1];
  const level = question?.level || Math.ceil(questionNumber / 4);
  const difficultyLabels = ["Inicial", "Básica", "Intermedia", "Avanzada", "Reto"];
  const difficulty = difficultyLabels[level - 1] || "Reto";

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    selectedRef.current = null;
    phaseRef.current = "idle";
    setSelectedAnswer(null);
    setAnswerClass("answer");
    setHiddenAnswers([]);
    setLifelineModal(null);
  }, [questionNumber, data]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (callback, delay) => {
    const timer = setTimeout(() => {
      timersRef.current = timersRef.current.filter((item) => item !== timer);
      callback();
    }, delay);
    timersRef.current.push(timer);
  };

  const confirmAnswer = (answer) => {
    if (phaseRef.current === "resolving") return;
    clearTimers();
    setAnswerClass(answer.correct ? "answer correct" : "answer wrong");

    if (answer.correct) {
      phaseRef.current = "correct";
      correctAnswer();
      onCorrectAnswer(questionNumber);
    } else {
      phaseRef.current = "resolving";
      wrongAnswer();
      schedule(() => setTimeOut(true), 1000);
    }
  };

  const canUseLifeline = (lifeline) =>
    (lifeline === "audience" ? usedLifelines.audience < 2 : !usedLifelines[lifeline]) && phaseRef.current === "idle";

  const markLifelineUsed = (lifeline) => {
    setUsedLifelines((previous) => ({
      ...previous,
      [lifeline]: lifeline === "audience" ? previous.audience + 1 : true,
    }));
    playLifelineSound(lifeline);
    onUseLifeline();
  };

  const useFiftyFifty = () => {
    if (!canUseLifeline("fifty") || !question) return;
    markLifelineUsed("fifty");
    const wrongAnswers = question.answers.filter((answer) => !answer.correct);
    const removed = [...wrongAnswers].sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenAnswers(removed);
  };

  const usePhoneFriend = () => {
    if (!canUseLifeline("phone") || !question) return;
    markLifelineUsed("phone");
    setLifelineModal({ type: "phone", title: "Llamando a un amigo…", waiting: true });
    schedule(() => {
      const correctAnswerOption = question.answers.find((answer) => answer.correct);
      const adviceIsCorrect = Math.random() < 0.75;
      const suggestion = adviceIsCorrect
        ? correctAnswerOption
        : question.answers.filter((answer) => !answer.correct)[Math.floor(Math.random() * 3)];
      setLifelineModal({
        type: "phone",
        title: "Tu amigo responde",
        message: `Creo que la respuesta es: ${suggestion.text}`,
      });
    }, 1300);
  };

  const useAudience = () => {
    if (!canUseLifeline("audience") || !question) return;
    markLifelineUsed("audience");
    const correctIndex = question.answers.findIndex((answer) => answer.correct);
    const correctPercent = 55 + Math.floor(Math.random() * 26);
    let remaining = 100 - correctPercent;
    const poll = question.answers.map((answer, index) => {
      if (index === correctIndex) return { answer, percentage: correctPercent };
      const percentage = index === question.answers.length - 1
        ? remaining
        : Math.floor(Math.random() * (remaining + 1));
      remaining -= percentage;
      return { answer, percentage };
    });
    setLifelineModal({ type: "audience", title: "Ayuda del público", poll });
  };

  const handleAnswerClick = (answer) => {
    if (phaseRef.current !== "idle" && phaseRef.current !== "selected") return;

    if (phaseRef.current === "selected") {
      if (selectedRef.current === answer) confirmAnswer(answer);
      return;
    }

    selectedRef.current = answer;
    phaseRef.current = "selected";
    setSelectedAnswer(answer);
    setAnswerClass("answer active");

    // Keep the original automatic flow, but allow a second click on the same choice to confirm immediately.
    schedule(() => setAnswerClass(answer.correct ? "answer correct" : "answer wrong"), 3000);
    schedule(() => confirmAnswer(answer), 5000);
  };

  return (
    <div className="trivia">
      <div className="difficulty">Nivel {level} · Dificultad {difficulty} · Pregunta {questionNumber} de {data.length}</div>
      <div className="question">{question?.question}</div>
      <div className="lifelines" aria-label="Ayudas disponibles">
        <button type="button" onClick={useFiftyFifty} disabled={!canUseLifeline("fifty")} aria-label="Ayuda 50:50">
          50:50{usedLifelines.fifty ? " · Usada" : ""}
        </button>
        <button type="button" onClick={usePhoneFriend} disabled={!canUseLifeline("phone")} aria-label="Llamar a un amigo">
          ☎ Amigo{usedLifelines.phone ? " · Usada" : ""}
        </button>
        <button type="button" onClick={useAudience} disabled={!canUseLifeline("audience")} aria-label={`Ayuda del público, ${2 - usedLifelines.audience} usos restantes`}>
          👥 Público · {2 - usedLifelines.audience} restantes
        </button>
      </div>
      <div className="answers">
        {question?.answers.filter((answer) => !hiddenAnswers.includes(answer)).map((answer, index) => (
          <button
            type="button"
            key={`${question.id}-${index}`}
            className={selectedAnswer === answer ? answerClass : "answer"}
            onClick={() => handleAnswerClick(answer)}
            aria-pressed={selectedAnswer === answer}
            aria-label={`${answer.text}${selectedAnswer === answer ? ". Pulsa otra vez para confirmar" : ""}`}
          >
            {answer.text}
          </button>
        ))}
      </div>
      {selectedAnswer && phaseRef.current === "selected" && (
        <p className="answerHint" role="status">Respuesta seleccionada. Pulsa de nuevo para confirmar y continuar.</p>
      )}
      {phaseRef.current === "correct" && (
        <div className="answerHint" role="status">
          <p>¡Respuesta correcta! Tómate un momento para conversar con el grupo.</p>
          <button
            type="button"
            className="restartButton"
            onClick={() => setQuestionNumber((previous) => previous + 1)}
          >
            Continuar a la siguiente pregunta
          </button>
        </div>
      )}
      {lifelineModal && (
        <div className="lifelineModalBackdrop">
          <section className="lifelineDialog" role="dialog" aria-modal="true" aria-labelledby="lifeline-title">
            <h2 id="lifeline-title">{lifelineModal.title}</h2>
            {lifelineModal.waiting && <p>Conectando…</p>}
            {lifelineModal.message && <p>{lifelineModal.message}</p>}
            {lifelineModal.poll && (
              <div className="audiencePoll">
                {lifelineModal.poll.map(({ answer, percentage }) => (
                  <div className="pollRow" key={answer.text}>
                    <span>{answer.text}</span>
                    <div className="pollTrack"><div className="pollBar" style={{ width: `${percentage}%` }} /></div>
                    <strong>{percentage}%</strong>
                  </div>
                ))}
              </div>
            )}
            <button type="button" className="restartButton" onClick={() => setLifelineModal(null)}>Volver al juego</button>
          </section>
        </div>
      )}
    </div>
  );
}
