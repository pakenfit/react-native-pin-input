import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Keyboard,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  ViewProps,
  TextInputProps,
  TextInput,
} from 'react-native';
import { Input } from './Input';
import * as Clipboard from 'expo-clipboard';
import { IS_IOS } from '../constants';

export type PinInputRef = {
  clear: () => void;
};

type PinInputProps = {
  inputProps?: Omit<
    TextInputProps,
    | 'style'
    | 'onChangeText'
    | 'onKeyPress'
    | 'autoComplete'
    | 'keyboardType'
    | 'autoFocus'
  >;
  inputStyle?: TextInputProps['style'];
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewProps['style'];
  length?: number;
  onFillEnded?: (otp: string) => void;
  autoFocus?: boolean;
};
export const PinInput = forwardRef<PinInputRef, PinInputProps>(
  (
    {
      length = 4,
      inputProps,
      inputStyle,
      containerProps,
      containerStyle,
      onFillEnded,
      autoFocus = true,
    },
    ref
  ) => {
    const pins = Array.from({ length }).map((_, i) => i);
    const inputRefs = useRef<TextInput[]>([]);
    const pinsValues = useRef<string[]>([]);
    const iosOTP = useRef<{
      key: string;
      index: number | null;
    }>({ key: '', index: null });

    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const handleOTP = useCallback(
      (otp: string): boolean => {
        const regexp = new RegExp(`[0-9]{${length}}`);
        const otps = otp.match(regexp);
        if (otps?.length) {
          const otpSplits = otp.split('');
          otpSplits.forEach(
            (otpSplit, i) =>
              inputRefs?.current[i]?.setNativeProps({ text: otpSplit })
          );
          onFillEnded?.(otp);
          iosOTP.current = { key: '', index: null };
          Keyboard.dismiss();
          return true;
        }
        return false;
      },
      [length, onFillEnded]
    );

    const handleChangeText = useCallback(
      async (text: string, index: number) => {
        const copiedText = await Clipboard.getStringAsync();
        if (copiedText.includes(text) && !keyPressed) {
          const otpHandled = handleOTP(copiedText);
          if (otpHandled) {
            return;
          }
        }
        pinsValues.current[index] = text;
        if (index + 1 <= pins.length - 1) {
          inputRefs?.current[index + 1]?.focus();
        } else {
          onFillEnded?.(pinsValues.current.join(''));
          setKeyPressed(false);
          Keyboard.dismiss();
        }
      },
      [handleOTP, keyPressed, onFillEnded, pins.length]
    );

    const onKeyPress = useCallback(
      (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
      ) => {
        event.persist();
        setKeyPressed(true);
        if (IS_IOS && Number.isInteger(Number(event.nativeEvent.key))) {
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
          if (iosOTP.current.key.length === length) {
            handleOTP(iosOTP.current.key);
            return;
          }
        }

        if (event.nativeEvent.key === 'Backspace') {
          onFillEnded?.('');
          setKeyPressed(false);
          iosOTP.current = { key: '', index: null };
          if (index - 1 >= 0) {
            inputRefs?.current[index - 1]?.focus();
          }
        }
      },
      [handleOTP, length, onFillEnded]
    );

    const clear = useCallback(() => {
      pinsValues.current = [];
      inputRefs.current.forEach((input) => {
        input?.setNativeProps({ text: '', placeholder: '0' });
      });
      inputRefs.current[0]?.focus();
    }, []);

    useImperativeHandle(ref, () => ({ clear }), [clear]);

    return (
      <View style={[styles.container, containerStyle]} {...containerProps}>
        {pins.map((pin) => {
          return (
            <Input
              {...inputProps}
              autoFocus={autoFocus && pin === 0}
              ref={(input) => inputRefs?.current.push(input as TextInput)}
              key={pin}
              style={inputStyle}
              onChangeText={(text) => handleChangeText(text, pin)}
              onKeyPress={(event) => onKeyPress(event, pin)}
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              keyboardType="numeric"
            />
          );
        })}
      </View>
    );
  }
);

PinInput.displayName = 'PinInput';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
