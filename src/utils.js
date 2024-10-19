
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

export const FakeExerciseResult = (exam) => {
  const result = { ...exam };

  result.correctCnt = result.questionCnt;
  result.costTime = 1;

  for (let i = 0; i < result.questions.length; i++) {
    const question = result.questions[i];
    const pointPaths = getRandomPathPoint(Math.floor(randomNum(2, 8)));

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

export const getPkResultPageUrl = (pkIdStr) => {
  const url = `https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html?pkIdStr=${pkIdStr}`;
  let nativeUrl = `native://openWebView?url=${encodeURIComponent(
    url
  )}&hideNavigation=true&immerseStatusBar=true&autoHideLoading=false`;
  return nativeUrl;
};