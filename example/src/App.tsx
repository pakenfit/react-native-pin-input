import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { PinInput } from '@pakenfit/react-native-pin-input';

export default function App() {
  return (
    <View style={styles.container}>
      <PinInput onFillEnded={(otp) => console.log(otp)} autoFocus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
