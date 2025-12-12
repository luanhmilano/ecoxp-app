import { Link, Stack, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import EmailForm from '../components/auth/email-form';

export default function LoginScreen() {
  useFocusEffect(
    useCallback(() => {
      console.log('[LOGIN SCREEN] Screen focused - User navigated to login')
      return () => {
        console.log('[LOGIN SCREEN] Screen unfocused - User left login')
      }
    }, [])
  )

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>
            <EmailForm />
            
            <Link href={"/signup" as any} style={styles.signUpLink}>
              <ThemedText type="link">Don't have an account? Sign up</ThemedText>
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
    marginBottom: 20,
  },
  signUpLink: {
    alignSelf: 'center',
    marginTop: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.6,
  },
  socialContainer: {
    marginBottom: 20,
  },
  debugLink: {
    alignSelf: 'center',
    marginTop: 16,
  },
  debugText: {
    fontSize: 14,
    opacity: 0.5,
  },
});