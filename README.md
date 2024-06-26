# @pakenfit/react-native-pin-input

Phone Pin Input for React Native.

<p align='center'>
  <img src='./assets/demo.gif' width="300">
  <img src='./assets/demo2.gif' width="300">
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
npm install expo-clipboard --save
```
<p align="center">Or</p>

```sh
yarn add expo-clipboard
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
import { Button, StyleSheet, View } from 'react-native';
import { PinInput, PinInputRef } from '@pakenfit/react-native-pin-input';

export default function App() {
  const ref = React.useRef<PinInputRef>(null);

  return (
    <View style={styles.container}>
      <PinInput onFillEnded={(otp) => console.log(otp)} autoFocus ref={ref} />
      <Button title="Clear all" onPress={() => ref.current?.clear()} />
    </View>
  );
}
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

### `autoFocus`
Should autoFocus the first `input` element.

## API
The PinInput component provides the following methods through the PinInputRef:

- `clear()`: clear all the pin inputs

## Types

### PinInputRef
The `PinInputRef` type represents the reference to the PinInput component, allowing access to its methods. It has the only method: `clear()` see above.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
