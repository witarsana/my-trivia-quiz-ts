export const mergeAnswers = (arr: string[], correct: string): string[] => {
  const newArr = [...arr, correct];
  return newArr.sort(() => Math.random() - 0.5);
};
