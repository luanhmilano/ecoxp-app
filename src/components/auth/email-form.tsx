import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '../../providers/auth-provider';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

export default function EmailForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

  const handleLogin = async () => {
    if (!usernameOrEmail.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      clearError();
      await login({ 
        usernameOrEmail: usernameOrEmail.trim(), 
        password 
      });

      console.log('[EMAIL-FORM] Login completed, attempting navigation...');
      
      // Navegação após login bem-sucedido
      router.replace('/(tabs)');
      console.log('[EMAIL-FORM] Navigation executed');
    } catch (error) {
      Alert.alert(
        'Login Failed', 
        error instanceof Error ? error.message : 'An error occurred during login'
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="username"
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        editable={!isLoading}
      />
      
      <Button
        title={isLoading ? "Signing in..." : "Sign In"}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
});