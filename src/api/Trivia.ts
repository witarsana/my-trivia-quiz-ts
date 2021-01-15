import { Trivia, FilterTrivia } from "../types/Types";
import { mergeAnswers } from "../utils/utils";
import axios from "axios";

const baseUrl = `https://opentdb.com/api.php`;

export const getTrivias = async (filter: FilterTrivia): Promise<Trivia[]> => {
  let endPoint = `${baseUrl}?amount=${filter.amount}&type=multiple`;
  if (filter.difficulty) endPoint += `&difficulty=${filter.difficulty}`;

  return new Promise(async (resolve, rejects) => {
    try {
      const data: any = await axios.get(`${endPoint}`);
      const newRes: Trivia[] = data.data.results.map((rs: Trivia) => {
        return {
          ...rs,
          answers: mergeAnswers(rs.incorrect_answers, rs.correct_answer),
        };
      });
      resolve(newRes);
    } catch (err) {
      rejects(err);
    }
  });
};
