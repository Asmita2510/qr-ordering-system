import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { SPACING } from '@constants/spacing';
import { RADIUS } from '@constants/radius';

const styles = StyleSheet.create({
  button: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  disabled: {
    backgroundColor: COLORS.border,
  },

  primaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  disabledText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;