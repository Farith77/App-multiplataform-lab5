import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radius, spacing, typography, TOUCH_TARGET } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Botón único del sistema de diseño (RNF-01 · consistencia visual).
 * Mantiene el área táctil mínima de 48 px incluso en tamaño `sm`.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityHint,
  style,
  testID,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityHint={accessibilityHint}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? colors.white : colors.brand600}
        />
      ) : (
        <Text style={[styles.label, labelStyles[variant]]} numberOfLines={1}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
  },
  sm: { minHeight: TOUCH_TARGET, paddingHorizontal: spacing.md },
  md: { minHeight: TOUCH_TARGET + 4 },
  lg: { minHeight: TOUCH_TARGET + 8 },
  primary: { backgroundColor: colors.brand500 },
  secondary: {
    backgroundColor: colors.brand50,
    borderWidth: 1,
    borderColor: colors.brand100,
  },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.danger },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.45 },
  label: { ...typography.bodyStrong },
});

const labelStyles = StyleSheet.create({
  primary: { color: colors.textInverse },
  secondary: { color: colors.brand700 },
  ghost: { color: colors.brand600 },
  danger: { color: colors.textInverse },
});
