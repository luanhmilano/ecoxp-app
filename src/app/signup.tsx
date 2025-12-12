import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '../providers/auth-provider';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading, error, clearError } = useAuth();

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      clearError();
      await register({ 
        username: name.trim(), 
        email: email.trim(), 
        password 
      });
      
      // Mostra alerta de sucesso e redireciona para login
      Alert.alert(
        'Account Created Successfully!', 
        'Your account has been created. Please sign in to continue.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpa os campos do formulário
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              // Redireciona para a tela de login
              router.replace('/login');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed', 
        error instanceof Error ? error.message : 'An error occurred during registration'
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>
            {error && (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>{error}</ThemedText>
              </ThemedView>
            )}

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!isLoading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!isLoading}
            />

            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleSignUp}
              disabled={isLoading}
            />

            <Link href="/login" style={styles.signInLink}>
              <ThemedText type="link">Already have an account? Sign in</ThemedText>
            </Link>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: 'center',
  },
  formContainer: {
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
  signInLink: {
    alignSelf: 'center',
    marginTop: 12,
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