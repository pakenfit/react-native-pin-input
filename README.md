# @pakenfit/react-native-pin-input

Phone Pin Input for React Native.

<p align='center'>
  <img src='./assets/demo.gif' width="300">
</p>


## Installation

```sh
npm install @pakenfit/react-native-pin-input --save
```

<p align="center">Or</p>

```sh
yarn add @pakenfit/react-native-pin-input
```

#### Dependencies
This library needs these dependencies to be installed in your project before you can use it:

```sh
npm install react-native-gesture-handler react-native-reanimated expo-clipboard --save
```
<p align="center">Or</p>

```sh
yarn add react-native-gesture-handler react-native-reanimated expo-clipboard
```
#### Using Bare React Native ?
For `expo-clipboard` to work you need to follow [these additional steps to install expo modules.](https://docs.expo.dev/bare/installing-expo-modules/)

## Features

- Fully customizable
- OTP autofill support (both `Android` and `iOS`, not tested on `web` should work as well)
- Compatible with Expo
- Written in Typescript

---

## Usage

```js
import { PinInput } from '@pakenfit/react-native-pin-input';

// ...

<PinInput length={6} onFillEnded={otp => console.log(otp)}/>
```
---
## Props

### `length`
The number of pin inputs to display. `Default: 4`.

---

### `onFillEnded = (opt: string) => void`
The callback function with the final OTP when finish filling the inputs.



### `inputProps`
The props for each TextInput.

---


### `inputStyle`
The style applied to each `TextInput`.

---


### `containerProps`
The props for the `View` container.

---


### `containerStyle`
The style applied to the `View` container.

---


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
