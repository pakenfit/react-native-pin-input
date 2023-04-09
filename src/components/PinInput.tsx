import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Keyboard,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  ViewProps,
  TextInputProps,
} from 'react-native';
import { Input } from './Input';
import { TextInput } from 'react-native-gesture-handler';
import * as Clipboard from 'expo-clipboard';
import { Platform } from 'react-native';

type PinInputProps = {
  inputProps?: Omit<
    TextInputProps,
    'style' | 'onChangeText' | 'onKeyPress' | 'autoComplete' | 'keyboardType'
  >;
  inputStyle?: TextInputProps['style'];
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewProps['style'];
  length?: number;
  onFillEnded?: (otp: string) => void;
};
export const PinInput = ({
  length = 4,
  inputProps,
  inputStyle,
  containerProps,
  containerStyle,
  onFillEnded,
}: PinInputProps) => {
  const pins = Array.from({ length }).map((_, i) => i);
  const inputRefs = useRef<TextInput[]>([]);
  const pinsValues = useRef<string[]>([]);
  const iosOTP = useRef<{
    key: string;
    index: number | null;
  }>({ key: '', index: null });

  const handleOTP = useCallback(
    (otp: string): boolean => {
      const regexp = new RegExp(`[0-9]{${length}}`);
      const otps = otp.match(regexp);
      if (otps?.length) {
        const otpSplits = otp.split('');
        otpSplits.forEach((otpSplit, i) => {
          inputRefs?.current[i]?.setNativeProps({ text: otpSplit });
        });
        onFillEnded?.(otp);
        iosOTP.current = { key: '', index: null };
        Keyboard.dismiss();
        return true;
      }
      return false;
    },
    [length, onFillEnded]
  );

  const onChangeText = useCallback(
    async (text: string, index: number, isIOSOTP: boolean = false) => {
      if (isIOSOTP) {
        handleOTP(text);
        return;
      }

      const otpHandled = handleOTP(await Clipboard.getStringAsync());
      if (otpHandled) {
        return;
      }

      pinsValues.current[index] = text;
      if (index + 1 <= pins.length - 1) {
        inputRefs?.current[index + 1]?.focus();
      } else {
        onFillEnded?.(pinsValues.current.join(''));
        Keyboard.dismiss();
      }
    },
    [handleOTP, onFillEnded, pins.length]
  );

  const onKeyPress = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      event.persist();
      if (
        Platform.OS === 'ios' &&
        Number.isInteger(Number(event.nativeEvent.key))
      ) {
        if (iosOTP.current.index === null) {
          iosOTP.current = { key: event.nativeEvent.key, index };
        } else {
          if (iosOTP.current.index === index) {
            iosOTP.current = {
              key: `${iosOTP.current.key}${event.nativeEvent.key}`,
              index,
            };
          } else {
            iosOTP.current = { key: '', index: null };
          }
        }
        onChangeText(iosOTP.current.key, index, true);
      }

      if (event.nativeEvent.key === 'Backspace') {
        if (index - 1 >= 0) {
          inputRefs?.current[index - 1]?.focus();
        }
      }
    },
    [onChangeText]
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
            textContentType="oneTimeCode"
            keyboardType="numeric"
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
