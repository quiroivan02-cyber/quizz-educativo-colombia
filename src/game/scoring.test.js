import { getGradeForCorrectQuestions, getGradeIncrement } from "./scoring";

test("las primeras quince respuestas correctas suman 4,5", () => {
  expect(getGradeIncrement(1)).toBe(0.3);
  expect(getGradeIncrement(15)).toBe(0.3);
  expect(getGradeForCorrectQuestions(Array.from({ length: 15 }, (_, index) => index + 1))).toBe(4.5);
});

test("las cinco últimas respuestas correctas completan la nota máxima de 5,0", () => {
  expect(getGradeIncrement(16)).toBe(0.1);
  expect(getGradeIncrement(20)).toBe(0.1);
  expect(getGradeForCorrectQuestions(Array.from({ length: 20 }, (_, index) => index + 1))).toBe(5);
});
