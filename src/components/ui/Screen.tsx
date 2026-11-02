import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

type Props = {
  children: ReactNode;
  /** Envuelve el contenido en un ScrollView vertical. */
  scroll?: boolean;
  /** Aplica padding horizontal estándar (desactivar en pantallas con mapa). */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Contenedor base de pantalla: fondo, safe area y padding consistentes.
 * Se usa en todas las rutas para evitar estilos duplicados.
 */
export function Screen({ children, scroll = true, padded = true, style, testID }: Props) {
  const content = <View style={[padded && styles.padded, style]}>{children}</View>;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']} testID={testID}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingBottom: spacing['2xl'] },
  padded: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
});
