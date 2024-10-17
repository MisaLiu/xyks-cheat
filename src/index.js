import FridaEvent from './frida/index.js';

FridaEvent.on('exercise_start', (info) => {
  const exam = info.examVO;
  console.log(questions);
});
