import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { View, Keyboard } from 'react-native';
import { Input } from './Input';
import { TextInput } from 'react-native-gesture-handler';
import { TextInputProps } from 'react-native';
import { ViewProps } from 'react-native';
import { NativeSyntheticEvent } from 'react-native';
import { TextInputKeyPressEventData } from 'react-native';

type PinInputProps = {
  inputProps?: Omit<TextInputProps, 'style'>;
  inputStyle?: TextInputProps['style'];
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewProps['style'];
  length?: number;
};
export const PinInput = ({
  length,
  inputProps,
  inputStyle,
  containerProps,
  containerStyle,
}: PinInputProps) => {
  const pins = Array.from({ length: length || 4 }).map((_, i) => i);
  const inputRefs = React.useRef<TextInput[]>([]);

  const onChangeText = useCallback(
    (text: string, index: number) => {
      if (!text?.length) {
        return;
      }
      if (index + 1 <= pins.length - 1) {
        inputRefs?.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    },
    [pins.length]
  );

  const onKeyPress = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      if (event.nativeEvent.key === 'Backspace') {
        if (index - 1 >= 0) {
          inputRefs?.current[index - 1]?.focus();
        }
      }
    },
    []
  );

  return (
    <View style={[styles.container, containerStyle]} {...containerProps}>
      {pins.map((pin) => {
        return (
          <Input
            {...inputProps}
            ref={(input) => inputRefs?.current.push(input as TextInput)}
            key={pin}
            style={inputStyle}
            onChangeText={(text) => onChangeText(text, pin)}
            onKeyPress={(event) => onKeyPress(event, pin)}
            autoComplete="sms-otp"
            keyboardType="number-pad"
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
