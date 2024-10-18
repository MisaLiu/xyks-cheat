import { ADB } from 'appium-adb';
import { sleep } from './src/utils.js';

process.env['ANDROID_SDK_ROOT'] = 'D:\\Develop\\platform-tools';

const adb = await ADB.createADB();
const device = (await adb.getConnectedDevices())[0];

const LoopStartExercise = async () => {
  await adb.shell([
    'input', 'touchscreen', 'tap',
    420, 1440
  ]);

  await sleep(2000);
  await adb.shell([
    'input', 'keyboard', 'keyevent',
    4
  ]);

  await sleep(200);
  await adb.shell([
    'input', 'touchscreen', 'tap',
    92, 140
  ]);

  await sleep(200);
  await adb.shell([
    'input', 'touchscreen', 'tap',
    540, 1330
  ]);
};

setImmediate(() => LoopStartExercise());
setInterval(() => LoopStartExercise(), 3000);