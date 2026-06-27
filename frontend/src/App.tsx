import React from 'react';
import { SafeAreaView, View } from 'react-native';
// import Button from './components/Button';
import Button from '@components/Button';

import { SPACING } from './constants/spacing';

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
      }}>
      <View
        style={{
          gap: SPACING.md,
        }}>
        <Button
          title="Primary Button"
          onPress={() => console.log('Pressed')}
        />

        <Button
          title="Secondary Button"
          type="secondary"
        />

        <Button
          title="Loading"
          loading
        />

        <Button
          title="Disabled"
          disabled
        />
      </View>
    </SafeAreaView>
  );
}