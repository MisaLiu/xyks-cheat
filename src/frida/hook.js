
Java.perform(function() {
  const WebView = Java.use('android.webkit.WebView');

  WebView.setWebContentsDebuggingEnabled.overload('boolean').implementation = function() {
    this.setWebContentsDebuggingEnabled(true);
  };

  WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
    send({
      type: 'targetLoadUrl',
      data: url,
    });

    return this.loadUrl(url);
  };

  console.log('Hook WebView started...');
});
