import CDP from 'chrome-remote-interface';
import { encode as encodeBase64 } from 'js-base64';
import FridaEvent from './frida/index.js';
import { sleep, FakeExerciseResult, getPkResultPageUrl } from './utils.js';

/**
 * @type {null | CDP.Client}
 */
let webview = null;

const waitForWebView = (timeout = 5000) => {
  if (webview) return webview;
  return new Promise((res, rej) => {
    const startTime = Date.now();
    const waitFn = () => {
      const currentTime = Date.now();

      if (currentTime - startTime > timeout) {
        rej('Wait timeout');
        clearInterval(clockId);
        return;
      }

      if (!webview) return;

      res(webview);
      clearInterval(clockId);
    };

    setImmediate(() => waitFn());
    let clockId = setInterval(() => waitFn(), 100);
  });
}

FridaEvent.on('exercise_start', async () => {
  console.log('New exam detected!');

  await sleep(100);
  webview = await CDP({
    local: true,
  });
});

FridaEvent.on('exercise_end', async () => {
  console.log('----------------------');
  console.log('');

  if (webview) await webview.close();
});

FridaEvent.on('exercise_info', async (info) => {
  await waitForWebView();
  const { Page, Runtime } = webview;
  await Page.enable();

  const exam = info.examVO;
  const fakeResult = FakeExerciseResult(exam);

  console.log(`  -> ID: ${info.pkIdStr}`);
  console.log(`  -> Rival name: ${info.otherUser.userName} (ID: ${info.otherUser.userId})`);
  console.log(`  -> Rival winned rounds: ${info.otherWinCount}`);
  console.log(`  -> Your winned rounds: ${info.selfWinCount}`);

  try {
    await sleep(100);
    const fakeResultStr = JSON.stringify(fakeResult);
    const fakeResultBase64 = encodeBase64(fakeResultStr);

    await Runtime.evaluate({
      expression: `window.localStorage.setItem('__local_exerciseResult', '${fakeResultBase64}')`
    });
    await Runtime.evaluate({
      expression: `window.open('${getPkResultPageUrl(fakeResult.pkIdStr)}')`
    });
  } catch (e) {
    console.error(e);
  } finally {
    if (webview) await webview.close();
  }
});
