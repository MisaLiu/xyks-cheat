import CDP from 'chrome-remote-interface';
import { encode } from 'js-base64';
import { sleep } from './utils.js';

const getPkResultPageUrl = (pkIdStr) => {
  const url = `https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html?pkIdStr=${pkIdStr}`;
  let nativeUrl = `native://openWebView?url=${encodeURIComponent(
    url
  )}&hideNavigation=true&immerseStatusBar=true&autoHideLoading=false`;
  return nativeUrl;
};

export const setFakeResult = async (exam) => {
  const resultStr = JSON.stringify(exam);
  const resultBase = encode(resultStr);

  let client;
  try {
    client = await CDP({
      local: true,
    });
    const { Page, Runtime } = client;
    await Page.enable();

    await sleep(9000);

    await Runtime.evaluate({
      expression: `window.localStorage.setItem('__local_exerciseResult', '${resultBase}')`
    });
    await Runtime.evaluate({
      expression: `window.open('${getPkResultPageUrl(exam.pkIdStr)}')`
    });

  } catch (err) {
      console.error(err);
  } finally {
    if (client) await client.close();
  }
};
