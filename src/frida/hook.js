
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
    if (ExerciseStartUrlReg.test(url)) isExercising = true;
    if (ExerciseEndUrlReg.test(url)) isExercising = false;

    // Get Question list & answers
    if (QuestionListReg.test(url)) {
      if (!isExercising) return;

      send({
        type: 'pkInfoCaller',
        data: url,
      });
    }

    return this.loadUrl(url);
  };

  console.log('Hook WebView started...');
});
