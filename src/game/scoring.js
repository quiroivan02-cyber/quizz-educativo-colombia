export const getGradeIncrement = (questionNumber) => (questionNumber <= 15 ? 0.3 : 0.1);

export const getGradeForCorrectQuestions = (questionNumbers) => Number(
  questionNumbers.reduce((grade, questionNumber) => grade + getGradeIncrement(questionNumber), 0).toFixed(1)
);
