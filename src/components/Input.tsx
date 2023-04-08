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

export const Input = forwardRef<TextInput, TextInputProps>(
  (
    { placeholder = '0', style, onChangeText, ...rest }: TextInputProps,
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
        setValue(text);
        if (text?.length) {
          onChangeText?.(text);
        }
      },
      [onChangeText]
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
