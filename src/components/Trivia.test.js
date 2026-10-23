import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Trivia from "./Trivia";
import questions from "../questions";

jest.mock("use-sound", () => () => [jest.fn()]);

describe("Trivia answer confirmation", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("confirms and advances when the selected answer is clicked again", () => {
    const setQuestionNumber = jest.fn();
    const onCorrectAnswer = jest.fn();
    render(
      <Trivia
        data={questions.Matemáticas}
        questionNumber={1}
        setQuestionNumber={setQuestionNumber}
        setTimeOut={jest.fn()}
        onCorrectAnswer={onCorrectAnswer}
      />
    );

    const correctAnswer = questions.Matemáticas[0].answers.find((answer) => answer.correct);
    const correctChoice = screen.getByRole("button", { name: correctAnswer.text });
    fireEvent.click(correctChoice);
    expect(correctChoice).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(correctChoice);

    act(() => jest.advanceTimersByTime(1000));
    expect(setQuestionNumber).not.toHaveBeenCalled();
    expect(onCorrectAnswer).toHaveBeenCalledWith(1);
    expect(correctChoice).toHaveClass("answer correct");
    fireEvent.click(screen.getByRole("button", { name: "Continuar a la siguiente pregunta" }));
    expect(setQuestionNumber).toHaveBeenCalledWith(expect.any(Function));
  });

  test("50:50 leaves the correct answer and one distractor", () => {
    render(
      <Trivia data={questions.Matemáticas} questionNumber={1} setQuestionNumber={jest.fn()} setTimeOut={jest.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Ayuda 50:50" }));
    const correctAnswer = questions.Matemáticas[0].answers.find((answer) => answer.correct);
    expect(screen.getByRole("button", { name: correctAnswer.text })).toBeInTheDocument();
    expect(document.querySelectorAll(".answers button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Ayuda 50:50" })).toBeDisabled();
  });

  test("phone and audience lifelines display their help", () => {
    const onUseLifeline = jest.fn();
    render(
      <Trivia data={questions.Matemáticas} questionNumber={1} setQuestionNumber={jest.fn()} setTimeOut={jest.fn()} onUseLifeline={onUseLifeline} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Llamar a un amigo" }));
    expect(screen.getByText("Conectando…")).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1300));
    expect(screen.getByText(/Creo que la respuesta es:/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Volver al juego" }));

    fireEvent.click(screen.getByRole("button", { name: "Ayuda del público, 2 usos restantes" }));
    const percentages = screen.getAllByText(/^\d+%$/).map((element) => Number(element.textContent.replace("%", "")));
    expect(percentages.reduce((sum, percentage) => sum + percentage, 0)).toBe(100);
    fireEvent.click(screen.getByRole("button", { name: "Volver al juego" }));
    expect(screen.getByRole("button", { name: "Ayuda del público, 1 usos restantes" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Ayuda del público, 1 usos restantes" }));
    expect(onUseLifeline).toHaveBeenCalledTimes(3);
    fireEvent.click(screen.getByRole("button", { name: "Volver al juego" }));
    expect(screen.getByRole("button", { name: "Ayuda del público, 0 usos restantes" })).toBeDisabled();
  });
});
