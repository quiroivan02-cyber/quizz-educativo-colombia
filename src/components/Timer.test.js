import React from "react";
import { render, screen } from "@testing-library/react";
import Timer from "./Timer";

test("empieza la cuenta regresiva en 45 segundos", () => {
  render(<Timer setTimeOut={jest.fn()} questionNumber={1} />);
  expect(screen.getByText("45")).toBeInTheDocument();
});

test("suma 60 segundos cuando se usa una ayuda", () => {
  render(<Timer setTimeOut={jest.fn()} questionNumber={1} bonusSeconds={60} />);
  expect(screen.getByText("105")).toBeInTheDocument();
});

test("permite configurar 70 segundos por pregunta para matemáticas", () => {
  render(<Timer setTimeOut={jest.fn()} questionNumber={1} initialSeconds={70} />);
  expect(screen.getByText("70")).toBeInTheDocument();
});
