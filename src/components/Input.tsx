import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '../theme/colors';
import { StyleSheet } from 'react-native';

export const Input = forwardRef<TextInput, TextInputProps>(
  ({ placeholder = '0', style, ...rest }: TextInputProps, ref) => {
    const innerRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => innerRef.current as TextInput);

    const onFocus = useCallback(() => {
      innerRef.current?.setNativeProps({ placeholder: '' });
    }, []);

    const onBlur = useCallback(() => {
      innerRef.current?.setNativeProps({ placeholder });
    }, [placeholder]);

    return (
      <TextInput
        ref={innerRef}
        {...rest}
        placeholderTextColor={Colors.BLACKMATTE}
        style={[styles.container, style]}
        maxLength={1}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
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
