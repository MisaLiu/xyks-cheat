import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { EventEmitter } from 'events';
import { decode as decodeBase64 } from 'js-base64';
import frida from 'frida';

const ExerciseStartUrlReg = /\/bh5\/leo-web-oral-pk\/exercise\.html\?/;
const ExerciseEndUrlReg = /\/bh5\/leo-web-oral-pk\/result\.html\?/;
const QuestionListReg = /^javascript\:\(window.dataDecrypt_(\d+)_(\d+)\s\&\&\swindow\.dataDecrypt_(\d+)_(\d+)\(\"(.+)\"\)\)$/;

const ScriptPath = resolve(dirname(fileURLToPath(import.meta.url)), './hook.js');
const EventListener = new EventEmitter();

const decodeRawPKInfo = (url) => {
  const callerBase64 = QuestionListReg.exec(url)[5];
  const resultJson = JSON.parse(decodeBase64(callerBase64))[1];
  const resultBase64 = resultJson.result.replaceAll('\n', '');
  const pkInfoJson = JSON.parse(decodeBase64(resultBase64));
  return pkInfoJson;
};

const onMessage = (message, data) => {
  if (message.type !== 'send') {
    console.log(JSON.stringify(message, null, 2));
    return;
  }

  const { payload } = message;
  if (payload.type === 'targetLoadUrl') {
    if (ExerciseStartUrlReg.test(payload.data)) {
      EventListener.emit('exercise_start');
    }
    if (ExerciseEndUrlReg.test(payload.data)) {
      EventListener.emit('exercise_end');
    }

    if (QuestionListReg.test(payload.data)) {
      try {
        const pkInfo = decodeRawPKInfo(payload.data);
        EventListener.emit('exercise_info', pkInfo);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

const launchFrida = async () => {
  const ScriptRaw = readFileSync(ScriptPath, { encoding: 'utf-8' });

  // Preparing Frida
  const Device = await frida.getDeviceManager().addRemoteDevice('localhost');
  const Session = await Device.attach('小猿口算');
  const Script = await Session.createScript(ScriptRaw);

  // Init Frida
  Script.message.connect(onMessage);
  await Script.load();

  console.log('Frida is now READY');
};

launchFrida();
export default EventListener;
