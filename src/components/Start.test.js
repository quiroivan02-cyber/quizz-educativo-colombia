import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Start from "./Start";

test("inicia una partida nueva con nombre, categoría y modalidad seleccionados", () => {
  const onStartGame = jest.fn();
  render(<Start onStartGame={onStartGame} />);

  fireEvent.change(screen.getByRole("textbox", { name: "Tu nombre" }), {
    target: { value: "Ana" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Empezar" }));

  expect(onStartGame).toHaveBeenCalledWith("Ana", "Matemáticas", "money");
});

test("permite seleccionar la modalidad de nota", () => {
  const onStartGame = jest.fn();
  render(<Start onStartGame={onStartGame} />);
  fireEvent.change(screen.getByRole("textbox", { name: "Tu nombre" }), { target: { value: "Ana" } });
  fireEvent.change(screen.getByRole("combobox", { name: "Modalidad de juego:" }), { target: { value: "grade" } });
  fireEvent.click(screen.getByRole("button", { name: "Empezar" }));
  expect(onStartGame).toHaveBeenCalledWith("Ana", "Matemáticas", "grade");
});
