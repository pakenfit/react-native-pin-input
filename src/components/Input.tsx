import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '../theme/colors';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent } from 'react-native';
import { TextInputKeyPressEventData } from 'react-native';

export const Input = forwardRef<TextInput, TextInputProps>(
  (
    {
      placeholder = '0',
      style,
      onChangeText,
      onKeyPress,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const innerRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>('');
    const [innerPlaceholder, setInnerPlaceholder] =
      useState<string>(placeholder);

    useImperativeHandle(ref, () => innerRef.current as TextInput);

    const onFocus = useCallback(() => {
      setInnerPlaceholder('');
    }, []);

    const onBlur = useCallback(() => {
      if (!value?.length) {
        setInnerPlaceholder(placeholder);
      }
    }, [placeholder, value?.length]);

    const handleChangeText = useCallback(
      (text: string) => {
        const regex = /^\d+$/;
        if (regex.test(text)) {
          setValue(text);
          onChangeText?.(text);
        } else {
          innerRef.current?.setNativeProps({ text: '' });
        }
      },
      [onChangeText]
    );

    const handleKeyPress = useCallback(
      (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === 'Backspace') {
          setValue('');
          innerRef.current?.setNativeProps({ text: '' });
          console.log(innerRef?.current?.isFocused());
          if (!innerRef?.current?.isFocused()) {
            innerRef.current?.setNativeProps({ placeholder: innerPlaceholder });
          }
        }
        onKeyPress?.(event);
      },
      [innerPlaceholder, onKeyPress]
    );

    return (
      <TextInput
        ref={innerRef}
        {...rest}
        placeholderTextColor={Colors.BLACKMATTE}
        style={[styles.container, style]}
        placeholder={innerPlaceholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={handleChangeText}
        maxLength={1}
        onKeyPress={handleKeyPress}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: Colors.SPANISHGRAY,
    borderRadius: 8,
    height: 71,
    width: 80,
    textAlign: 'center',
  },
});
