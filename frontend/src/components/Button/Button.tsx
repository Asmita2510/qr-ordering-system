import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import { ButtonProps } from './types';
import { COLORS } from '@theme/colors';

const Button = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) => {
  const buttonStyle = [
    styles.button,
    disabled
      ? styles.disabled
      : type === 'primary'
      ? styles.primary
      : styles.secondary,
  ];

  const textStyle = disabled
    ? styles.disabledText
    : type === 'primary'
    ? styles.primaryText
    : styles.secondaryText;

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          color={
            type === 'primary'
              ? COLORS.white
              : COLORS.primary
          }
        />
      ) : (
        <Text style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;