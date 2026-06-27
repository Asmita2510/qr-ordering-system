// import React from 'react';
// import { SafeAreaView, Text } from 'react-native';

// export default function App() {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Hello DineFlow 🚀</Text>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { COLORS } from './theme/colors';
import { SPACING } from './theme/spacing';
import { TYPOGRAPHY } from '@theme/typography';

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SPACING.lg,
      }}>
      <Text
        style={{
          ...TYPOGRAPHY.h1,
          color: COLORS.primary,
        }}>
        DineFlow 🚀
      </Text>

      <Text
        style={{
          ...TYPOGRAPHY.body,
          color: COLORS.textSecondary,
          marginTop: SPACING.md,
        }}>
        Scan • Order • Enjoy
      </Text>
    </SafeAreaView>
  );
}