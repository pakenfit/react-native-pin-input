import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Input } from '../components/Input';

const onChangeTextMock = jest.fn();

describe('Input', () => {
  it('The placeholder should be 0', () => {
    render(<Input placeholder="0" />);
    expect(screen.getByPlaceholderText('0')).toBeTruthy();
  });

  it('onChangeText function should be called', () => {
    render(<Input placeholder="0" onChangeText={onChangeTextMock} />);
    fireEvent.changeText(screen.getByPlaceholderText('0'), '1');
    expect(onChangeTextMock).toBeCalledWith('1');
  });
});
