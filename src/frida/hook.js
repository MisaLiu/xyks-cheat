
const ExerciseStartUrlReg = /\/bh5\/leo-web-oral-pk\/exercise\.html\?/;
const ExerciseEndUrlReg = /\/bh5\/leo-web-oral-pk\/result\.html\?/;
const QuestionListReg = /^javascript\:\(window.dataDecrypt_(\d+)_(\d+)\s\&\&\swindow\.dataDecrypt_(\d+)_(\d+)\(\"(.+)\"\)\)$/;

let isExercising = false;

Java.perform(function() {
  const WebView = Java.use('android.webkit.WebView');

  WebView.setWebContentsDebuggingEnabled.overload('boolean').implementation = function() {
    this.setWebContentsDebuggingEnabled(true);
  };

  WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
    const base64Fn = Java.use('android.util.Base64');
    const stringFn = Java.use('java.lang.String');

    if (ExerciseStartUrlReg.test(url)) {
      console.log('Exercise started!');
      isExercising = true;
    }

    if (ExerciseEndUrlReg.test(url)) {
      console.log('Exercise stoped!');
      isExercising = false;
    }

    // Get Question list & answers
    if (QuestionListReg.test(url)) {
      if (!isExercising) return;

      const questionRegResult = QuestionListReg.exec(url);
      const questionRawBase64 = questionRegResult[5];

      let step1 = base64Fn.decode(questionRawBase64, 0);
      step1 = stringFn.$new(step1, 'UTF-8');

      let step2 = step1.replace(stringFn.$new('\\u0026'), stringFn.$new('&'));
      step2 = step2.replace(stringFn.$new('\\u003d'), stringFn.$new('='));

      const step3 = JSON.parse(step2)[1].result;

      const step4 = step3.replaceAll('\n', '');

      const step5 = unescape(step4);

      let step6 = base64Fn.decode(step5, 0);
      step6 = stringFn.$new(step6, 'UTF-8');
      step6 = JSON.parse(step6);

      console.log('Question list decoded!');
      send(step6);
    }

    return this.loadUrl(url);
  };

  console.log('Hook WebView started...');
});
