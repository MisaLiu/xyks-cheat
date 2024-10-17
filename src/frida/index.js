import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { EventEmitter } from 'events';
import frida from 'frida';

const ScriptPath = resolve(dirname(fileURLToPath(import.meta.url)), './hook.js');
const EventListener = new EventEmitter();

const onMessage = (message, data) => {
  if (message.type === 'send') {
    EventListener.emit('exercise_start', message.payload);
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
