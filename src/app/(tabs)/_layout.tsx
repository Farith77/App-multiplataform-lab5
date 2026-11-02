import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { colors, typography } from '@/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon = (name: IconName, focusedName: IconName) => {
  function TabBarIcon({
    color,
    size,
    focused,
  }: {
    color: ColorValue | null;
    size: number;
    focused: boolean;
  }) {
    return (
      <Ionicons
        name={focused ? focusedName : name}
        size={size}
        color={typeof color === 'number' ? colors.textMuted : (color ?? colors.textMuted)}
      />
    );
  }

  TabBarIcon.displayName = `TabBarIcon(${focusedName})`;
  return TabBarIcon;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand600,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { borderTopColor: colors.border, height: 64, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { ...typography.label },
      }}
    >
      <Tabs.Screen
        name="mapa"
        options={{ title: 'Mapa', tabBarIcon: tabIcon('map-outline', 'map') }}
      />
      <Tabs.Screen
        name="publicar"
        options={{ title: 'Donar', tabBarIcon: tabIcon('add-circle-outline', 'add-circle') }}
      />
      <Tabs.Screen
        name="reservas"
        options={{ title: 'Reservas', tabBarIcon: tabIcon('cube-outline', 'cube') }}
      />
      <Tabs.Screen
        name="impacto"
        options={{ title: 'Impacto', tabBarIcon: tabIcon('leaf-outline', 'leaf') }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: tabIcon('person-outline', 'person') }}
      />
      <Tabs.Screen name="donaciones" options={{ href: null }} />
    </Tabs>
  );
}
