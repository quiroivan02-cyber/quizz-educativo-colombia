import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import questions, { getRandomQuestionSequence } from './questions';

test('muestra el inicio del juego y las categorías disponibles', () => {
  render(<App />);
  expect(screen.getByText(/¿Quién quiere ser millonario\?/i)).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Matemáticas' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Cultura general de Colombia' })).toBeInTheDocument();
});

test('al empezar prepara 20 preguntas aleatorias para esa partida', () => {
  window.localStorage.clear();
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Tu nombre' }), { target: { value: 'Estudiante' } });
  fireEvent.click(screen.getByRole('button', { name: 'Empezar' }));
  expect(screen.getByText(/Pregunta 1 de 20/)).toBeInTheDocument();
  expect(screen.getByText('70')).toBeInTheDocument();
});

test('conserva 45 segundos iniciales para cultura general', () => {
  window.localStorage.clear();
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Tu nombre' }), { target: { value: 'Estudiante' } });
  fireEvent.change(screen.getByRole('combobox', { name: 'Elige una categoría:' }), { target: { value: 'Cultura general de Colombia' } });
  fireEvent.click(screen.getByRole('button', { name: 'Empezar' }));
  expect(screen.getByText('45')).toBeInTheDocument();
});

test('permite iniciar en modo nota y muestra el acumulado desde cero', () => {
  window.localStorage.clear();
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Tu nombre' }), { target: { value: 'Estudiante' } });
  fireEvent.change(screen.getByRole('combobox', { name: 'Modalidad de juego:' }), { target: { value: 'grade' } });
  fireEvent.click(screen.getByRole('button', { name: 'Empezar' }));
  expect(screen.getByRole('status')).toHaveTextContent('Nota acumulada: 0.0 / 5.0');
  expect(screen.getByText('Nota 0.3')).toBeInTheDocument();
});

test('cada categoría tiene un banco amplio de preguntas para generar partidas nuevas', () => {
  expect(questions['Matemáticas']).toHaveLength(98);
  expect(questions['Cultura general de Colombia']).toHaveLength(68);
  expect(questions['Matemáticas'].filter(({ level }) => level === 1)).toHaveLength(30);
  expect(questions['Matemáticas'].filter(({ level }) => level === 2)).toHaveLength(30);
  expect(questions['Cultura general de Colombia'].filter(({ level }) => level === 1)).toHaveLength(30);
});

test('las preguntas matemáticas del segundo bloque usan negativos, paréntesis y exponentes hasta tres', () => {
  const secondLevel = questions['Matemáticas'].filter(({ level }) => level === 2);
  expect(secondLevel).toHaveLength(30);
  expect(secondLevel.some(({ question }) => question.includes('−'))).toBe(true);
  expect(secondLevel.some(({ question }) => question.includes('('))).toBe(true);
  expect(secondLevel.some(({ question }) => question.includes('²') || question.includes('³'))).toBe(true);
  expect(secondLevel.every(({ question }) => !question.includes('⁴') && !question.includes('⁵'))).toBe(true);
});

test('cada pregunta tiene cuatro opciones y exactamente una respuesta correcta', () => {
  Object.values(questions).flat().forEach(({ answers }) => {
    expect(answers).toHaveLength(4);
    expect(answers.filter(({ correct }) => correct)).toHaveLength(1);
  });
});

test('genera partidas con cinco bloques de cuatro preguntas en dificultad creciente', () => {
  const first = getRandomQuestionSequence(questions['Matemáticas']);
  const second = getRandomQuestionSequence(questions['Matemáticas'], [first.map(({ id }) => id)]);
  let history = [];
  const uniqueSets = new Set();
  for (let student = 0; student < 20; student += 1) {
    const game = getRandomQuestionSequence(questions['Matemáticas'], history);
    const signature = game.map(({ id }) => id).sort((a, b) => a - b).join(',');
    uniqueSets.add(signature);
    history = [...history, game.map(({ id }) => id)];
  }
  expect(first).toHaveLength(20);
  expect(second).toHaveLength(20);
  expect(uniqueSets.size).toBe(20);
  expect(new Set(first.map(({ id }) => id)).size).toBe(20);
  expect(second.map(({ id }) => id).sort()).not.toEqual(first.map(({ id }) => id).sort());
  for (let block = 0; block < 5; block += 1) {
    expect(first.slice(block * 4, block * 4 + 4).every(({ level }) => level === block + 1)).toBe(true);
  }
});
