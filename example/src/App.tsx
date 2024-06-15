import * as React from 'react';

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
