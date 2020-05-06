
## react-native-kvideo
react-native-kvideo is a react-native-video based video player component. React Native > 0.62.* is required.


<a href="https://www.npmjs.com/package/react-native-kvideo"><img src="https://img.shields.io/npm/v/react-native-kvideo.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/react-native-kvideo"><img src="https://img.shields.io/npm/dm/react-native-kvideo.svg?style=flat-square"></a>

> Currently, the performance is not tested on IOS.

__Features:__
- Basic playback features, friendly interface, progress control, evolving animation, and simple style.
- Fine-grained optimization, the UI thread can maintain 60 FPS during playback, and the JS thread can maintain 60 ~ 55 FPS.
- Provides full-screen playback.
- Supports formats such as MP4, M4A, FMP4, WebM, MKV, MP3, Ogg, WAV, MPEG-TS, MPEG-PS, FLV and ADTS (AAC).
- Support DASH, HlS and SmoothStreaming adaptive streaming.


<br />

#### Basic playback function, schedule control.
![](./demo.png)

### Installation

React-native-kvideo uses react-native-video, react-native-system-setting,react-native-vector-icons, and @react-native-community/slider. You need to install these dependencies yourself.

```bash
yarn add react-native-kvideo
```

link:

```bash
react-native link react-native-video
react-native link react-native-system-setting
react-native link react-native-vector-icons
react-native link @react-native-community/slider
```

### Usage simple

```js
import IVideo from 'react-native-kvideo';

<IVideo
    source={{ uri: uri }}
/>
```

### Functions & Props 

> check your autocomplete vscode or idea