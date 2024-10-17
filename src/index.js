import FridaEvent from './frida/index.js';
import { setFakeResult } from './webview.js';
import { sleep } from './utils.js';

const randomNum = (min, max) => Math.random() * (max - min + 1) + min;

const getRandomPathPoint = (count = 10) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push({
      x: randomNum(0, 600),
      y: randomNum(0, 600)
    });
  }

  return [ result ];
};

const FakeExerciseResult = (exam) => {
  const result = { ...exam };

  result.correctCnt = result.questionCnt;
  result.costTime = 1;

  for (let i = 0; i < result.questions.length; i++) {
    const question = result.questions[i];
    const pointPaths = getRandomPathPoint();

    question.status = 1;
    question.userAnswer = question.answer;
    question.script = JSON.stringify(pointPaths);
    question.curTrueAnswer = {
      recognizeResult: question.answer,
      pathPoints: pointPaths,
      answer: 1,
      showReductionFraction: 0,
    };
  }

  result.updatedTime = Date.now();

  return result;
};

FridaEvent.on('exercise_start', async (info) => {
  const exam = info.examVO;
  const fakeResult = FakeExerciseResult(exam);

  await sleep(5000);

  try {
    setFakeResult(fakeResult);
  } catch (e) {
    console.error(e);
  }
});
