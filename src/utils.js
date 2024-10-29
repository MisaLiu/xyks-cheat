
export const sleep = (ms) => new Promise((res) => setTimeout(() => res(true), ms));

export const randomNum = (min, max) => Math.random() * (max - min + 1) + min;

export const getRandomPathPoint = (count = 10) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push({
      x: randomNum(0, 600),
      y: randomNum(0, 600)
    });
  }

  return [ result ];
};

export const FakeExerciseResult = (exam, magn = 1) => {
  const result = { ...exam };
  const oldQuestions = [ ...result.questions ];

  result.questions = [];

  for (let x = 0; x < magn; x++) {
    for (let i = 0; i < oldQuestions.length; i++) {
      const currQuestionIndex = (oldQuestions.length * x) + i;
      const question = { ...oldQuestions[i] };
      const pointPaths = getRandomPathPoint(Math.floor(randomNum(2, 8)));

      question.id = currQuestionIndex;
      question.status = 1;
      question.userAnswer = question.answers[0];
      question.script = JSON.stringify(pointPaths);
      question.curTrueAnswer = {
        recognizeResult: question.answers[0],
        pathPoints: pointPaths,
        answer: 1,
        showReductionFraction: 0,
      };

      result.questions.push(question);
    }
  }

  result.questionCnt = result.questions.length;
  result.correctCnt = result.questionCnt;

  result.costTime = result.questionCnt * 200 + (magn * 1000);
  result.updatedTime = Date.now() + (result.questionCnt * 200) + (magn * 1000);

  return result;
};

export const getPkResultPageUrl = (pkIdStr) => {
  const url = `https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html?pkIdStr=${pkIdStr}`;
  let nativeUrl = `native://openWebView?url=${encodeURIComponent(
    url
  )}&hideNavigation=true&immerseStatusBar=true&autoHideLoading=false`;
  return nativeUrl;
};