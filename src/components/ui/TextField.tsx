import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
};

/**
 * Campo de texto accesible: etiqueta visible, mensaje de error y hint.
 * RNF-09 · los errores nunca se comunican solo por color.
 */
export function TextField({ label, error, hint, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={hint ?? error}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, !!error && styles.inputError, style]}
        {...rest}
      />
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { ...typography.label, color: colors.textSecondary },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    ...typography.body,
  },
  inputError: { borderColor: colors.danger },
  error: { ...typography.caption, color: colors.danger },
  hint: { ...typography.caption, color: colors.textMuted },
});
