# xyks-cheat

A cheat program for an education app.

This project is for fun, licensed under the [WTFPL](./LICENSE).

Special thanks to [th](https://github.com/xmexg/xyks)[es](https://github.com/FoskyM/XiaoYuanKouSuan_Tutorial)[e](https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook) ideas & inspiration!

## Requirements

* An Android emulator with [Magisk](https://github.com/Hawcett/XiaoYuanKouSuan_Frida_hook) installed
* [LSPosed](https://github.com/LSPosed/LSPosed) or any other Xposed framework installed
* [WebViewPP](https://github.com/WankkoRee/WebViewPP) installed
* [Frida server](https://github.com/frida/frida) downloaded
* [NodeJS](https://nodejs.org/) installed
* [Platform tools](https://developer.android.google.cn/tools/releases/platform-tools) (aka ADB) installed

## Usage

1. Clone this repo to your local space
2. `npm install`
3. `node run start`
4. (Optional) `node run start:auto` *Note: only tested on 1080x1920 resolution.*

You might need to use `adb forward` to forward Frida and WebView devtools if you can't connect to them.

Note that this program is designed to be used with an Android emulator, it need some modifications if you wish to use it with a real Android device.

## Thanks

* [Frida](https://github.com/frida/frida)
* [WebViewPP](https://github.com/WankkoRee/WebViewPP)
* [NodeJS](https://nodejs.org/)

## License
```plain
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```